import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { callApi } from './postman.js'
import { getAutotaskHeaders } from './config.js'
import {
  truncateResponse,
  enforceMaxRecords,
  formatResponse,
  extractEssentialFields,
} from './response-utils.js'

export function registerTools(server: McpServer) {
  // PRIMARY TOOL - Place at top for visibility
  server.tool(
    'getTicketsByCompanyName',
    `PRIMARY TOOL for tickets by company name. Use this when user asks for tickets from a company (e.g., "show me tickets for Company Name", "latest 5 tickets for Company Name", "recent tickets for Company Name"). This tool AUTOMATICALLY handles everything: finds the company, queries tickets, sorts by date (most recent first), and returns ACTUAL TICKET DETAILS. For "most recent" or "latest" queries, DO NOT set daysAgo - leave it undefined. The tool will return ALL tickets sorted by date (most recent first). Only use daysAgo when user explicitly mentions a time period (e.g., "last 30 days", "last month", "last year"). DO NOT use ticketsQueryCount - that returns only a number and cannot filter by company name. DO NOT enumerate or count tickets - this tool already returns the most recent tickets sorted by date. The tool handles all filtering and sorting server-side, so you get the most recent tickets directly without needing to count or paginate.`,
    {
      companyName: z.string().describe('The name of the company to search for'),
      maxRecords: z.number().max(100).optional().describe('Number of tickets to return (default: 50, max: 100). The tool automatically sorts by date DESC, so this returns the N most recent tickets.'),
      sortByDate: z.boolean().optional().describe('Sort by lastActivityDate descending (default: true). When true, returns most recent tickets first.'),
      daysAgo: z.number().optional().describe('ONLY use when user explicitly mentions a time period (e.g., "last 30 days" = 30, "last month" = 30, "last year" = 365). For "most recent" or "latest" queries without a time period, DO NOT set this parameter - leave it undefined. The tool will return all tickets sorted by date (most recent first) without any date filtering.'),
    },
    async (input, extra) => {
      try {
        // Step 1: Find company by name - try multiple search strategies
        const companySearchUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Companies/query`
        let companyData: any = null
        let companyId: string | null = null
        let allCompanies: any[] = []
        
        // Strategy 1: Try GET with search parameter (simple text search)
        try {
          companyData = await callApi(companySearchUrl, {
            method: 'GET',
            headers: getAutotaskHeaders(),
            params: { search: input.companyName },
          })
          
          // Collect all results
          if (Array.isArray(companyData)) {
            allCompanies = companyData
          } else if (companyData && typeof companyData === 'object') {
            if ('items' in companyData && Array.isArray(companyData.items)) {
              allCompanies = companyData.items
            } else if (Array.isArray((companyData as any).data)) {
              allCompanies = (companyData as any).data
            }
          }
        } catch (error) {
          console.log('GET search failed, trying POST query:', error)
        }
        
        // Strategy 2: If no results, try POST query with contains filter (case-insensitive partial match)
        if (allCompanies.length === 0) {
          try {
            const searchTerms = input.companyName.split(/\s+/).filter(t => t.length > 0)
            // Try searching for each word in the company name
            for (const term of searchTerms) {
              const postData = {
                filter: [
                  {
                    field: 'companyName',
                    op: 'contains',
                    value: term,
                  },
                ],
                maxRecords: 20,
              }
              
              companyData = await callApi(companySearchUrl, {
                method: 'POST',
                headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(postData),
              })
              
              if (Array.isArray(companyData)) {
                allCompanies = companyData
              } else if (companyData && typeof companyData === 'object') {
                if ('items' in companyData && Array.isArray(companyData.items)) {
                  allCompanies = companyData.items
                } else if (Array.isArray((companyData as any).data)) {
                  allCompanies = (companyData as any).data
                }
              }
              
              if (allCompanies.length > 0) break
            }
          } catch (error) {
            console.log('POST query failed:', error)
          }
        }
        
        // Strategy 3: Try exact match (case-insensitive)
        if (allCompanies.length === 0) {
          try {
            const postData = {
              filter: [
                {
                  field: 'companyName',
                  op: 'eq',
                  value: input.companyName,
                },
              ],
              maxRecords: 10,
            }
            
            companyData = await callApi(companySearchUrl, {
              method: 'POST',
              headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
              body: JSON.stringify(postData),
            })
            
            if (Array.isArray(companyData)) {
              allCompanies = companyData
            } else if (companyData && typeof companyData === 'object') {
              if ('items' in companyData && Array.isArray(companyData.items)) {
                allCompanies = companyData.items
              } else if (Array.isArray((companyData as any).data)) {
                allCompanies = (companyData as any).data
              }
            }
          } catch (error) {
            console.log('Exact match query failed:', error)
          }
        }
        
        // Find best match (exact match first, then partial)
        let bestMatch: any = null
        const searchNameLower = input.companyName.toLowerCase().trim()
        
        // First try exact match (case-insensitive)
        bestMatch = allCompanies.find((c: any) => {
          const name = (c.companyName || c.name || '').toLowerCase().trim()
          return name === searchNameLower
        })
        
        // If no exact match, try contains match
        if (!bestMatch) {
          bestMatch = allCompanies.find((c: any) => {
            const name = (c.companyName || c.name || '').toLowerCase().trim()
            return name.includes(searchNameLower) || searchNameLower.includes(name)
          })
        }
        
        // If still no match, use first result
        if (!bestMatch && allCompanies.length > 0) {
          bestMatch = allCompanies[0]
        }
        
        // Extract company ID (keep as number for API, but store as string for logging)
        let companyIdNum: number | null = null
        if (bestMatch) {
          companyIdNum = bestMatch.id || bestMatch.companyID || bestMatch.ID || null
          companyId = companyIdNum?.toString() || null
        }
        
        if (!companyId || !companyIdNum) {
          // Provide helpful suggestions
          const suggestions = allCompanies.length > 0 
            ? allCompanies.slice(0, 5).map((c: any) => c.companyName || c.name || 'Unknown').filter(Boolean)
            : []
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    error: 'Company not found',
                    message: `Could not find a company matching "${input.companyName}"`,
                    searchedName: input.companyName,
                    suggestions: suggestions.length > 0 
                      ? `Found ${suggestions.length} similar companies: ${suggestions.join(', ')}`
                      : 'No similar companies found',
                    recommendation: suggestions.length > 0
                      ? `Try using one of the suggested company names above, or use a partial name like "${input.companyName.split(' ')[0]}"`
                      : 'Check the company name spelling or try searching with a partial name',
                  },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          }
        }
        
        // Step 2: Query tickets by company ID with automatic date filtering and sorting
        const ticketsUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/query`
        // Fetch MANY more records than requested to ensure we get the most recent ones
        // The API might return tickets in ASC order (oldest first) or not respect sort,
        // so we fetch a large sample, sort client-side, then take top N
        // Fetch at least 500 tickets to ensure we get recent ones even if API returns oldest-first
        const fetchSize = Math.max((input.maxRecords || 5) * 100, 500)
        const ticketBody: any = {
          filter: [{ field: 'companyID', op: 'eq', value: companyIdNum }], // Use number, not string
          maxRecords: fetchSize, // Fetch many more to ensure we get recent tickets
        }
        
        // Note: We do NOT filter by lastActivityDate on the server side because:
        // 1. The Autotask API may not support filtering on lastActivityDate
        // 2. We'll do all date filtering client-side after fetching tickets
        // This ensures we get tickets even if the API doesn't support the date filter
        const daysToFilter = input.daysAgo
        console.log(`[getTicketsByCompanyName] No server-side date filter (will filter client-side). daysAgo: ${daysToFilter}`)
        
        // DON'T rely on server-side sort - the API might not respect it or might return ASC
        // We'll fetch a large sample and sort client-side to ensure correct order
        // Remove sort from request to avoid API potentially returning in wrong order
        console.log(`[getTicketsByCompanyName] No server-side sort (will sort client-side by lastActivityDate DESC)`)
        
        const optimizedBody = enforceMaxRecords(ticketBody)
        
        console.log(`[getTicketsByCompanyName] Querying tickets for company ${companyId} with body:`, JSON.stringify(optimizedBody, null, 2))
        
        const ticketData = await callApi(ticketsUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(optimizedBody),
        })
        
        console.log(`[getTicketsByCompanyName] API returned ${Array.isArray(ticketData) ? ticketData.length : 'non-array'} tickets`)
        console.log(`[getTicketsByCompanyName] Raw API response type:`, typeof ticketData, Array.isArray(ticketData) ? 'array' : ticketData?.constructor?.name || 'unknown')
        
        // Handle API response - it might already be an array or wrapped in an object
        let tickets: any[] = []
        if (Array.isArray(ticketData)) {
          tickets = ticketData
          console.log(`[getTicketsByCompanyName] API returned array with ${tickets.length} tickets`)
        } else if (ticketData && typeof ticketData === 'object') {
          // Try common response formats
          if (Array.isArray(ticketData.items)) {
            tickets = ticketData.items
            console.log(`[getTicketsByCompanyName] Found tickets in .items: ${tickets.length}`)
          } else if (Array.isArray(ticketData.data)) {
            tickets = ticketData.data
            console.log(`[getTicketsByCompanyName] Found tickets in .data: ${tickets.length}`)
          } else if (Array.isArray(ticketData.records)) {
            tickets = ticketData.records
            console.log(`[getTicketsByCompanyName] Found tickets in .records: ${tickets.length}`)
          } else {
            // Single ticket or unknown format
            console.log(`[getTicketsByCompanyName] Unknown response format, keys:`, Object.keys(ticketData))
            // Try to extract as single ticket
            if (ticketData.id || ticketData.ticketNumber) {
              tickets = [ticketData]
              console.log(`[getTicketsByCompanyName] Treated as single ticket`)
            }
          }
        }
        
        console.log(`[getTicketsByCompanyName] Parsed ${tickets.length} tickets from API response`)
        
        // Client-side date filter as fallback (in case API doesn't respect filter parameter)
        // Also filter out tickets with invalid dates (null, epoch, etc.)
        if (tickets.length > 0) {
          const beforeFilter = tickets.length
          
          // Determine cutoff date
          let cutoffDate: Date | null = null
          if (daysToFilter === 0) {
            // Explicitly requested no filter - but still filter out invalid dates
            cutoffDate = null
          } else if (daysToFilter !== undefined && daysToFilter > 0) {
            // User specified a time period
            cutoffDate = new Date()
            cutoffDate.setDate(cutoffDate.getDate() - daysToFilter)
            cutoffDate.setHours(0, 0, 0, 0)
          } else {
            // Default: Exclude tickets older than 2023-01-01, but only if we have many tickets
            // If we have few tickets, be less aggressive to avoid filtering everything out
            cutoffDate = new Date('2023-01-01T00:00:00.000Z')
            console.log(`[getTicketsByCompanyName] Using default date filter: 2023-01-01 (will filter out tickets older than this)`)
          }
          
          tickets = tickets.filter((ticket: any) => {
            // Get the ticket's date (prefer lastActivityDate, fallback to createDate)
            let ticketDate: Date | null = null
            
            if (ticket.lastActivityDate) {
              const d = new Date(ticket.lastActivityDate)
              if (!isNaN(d.getTime()) && d.getTime() > 0) {
                ticketDate = d
              }
            }
            
            if (!ticketDate && ticket.createDate) {
              const d = new Date(ticket.createDate)
              if (!isNaN(d.getTime()) && d.getTime() > 0) {
                ticketDate = d
              }
            }
            
            // If no valid date, exclude the ticket (invalid/epoch dates)
            if (!ticketDate) {
              console.log(`[getTicketsByCompanyName] Filtered out ticket ${ticket.id}: no valid date field (lastActivityDate: ${ticket.lastActivityDate}, createDate: ${ticket.createDate})`)
              return false
            }
            
            // If we have a cutoff date, check if ticket is after it
            if (cutoffDate && ticketDate < cutoffDate) {
              console.log(`[getTicketsByCompanyName] Filtered out ticket ${ticket.id}: date ${ticketDate.toISOString()} is before cutoff ${cutoffDate.toISOString()}`)
              return false
            }
            
            return true
          })
          
          console.log(`[getTicketsByCompanyName] After date filtering: ${tickets.length} tickets remaining (from ${beforeFilter} total)`)
          
          // If all tickets were filtered out, warn but don't fail - return empty array with helpful message
          if (tickets.length === 0 && beforeFilter > 0) {
            console.log(`[getTicketsByCompanyName] WARNING: All ${beforeFilter} tickets were filtered out by date filter`)
          }
          
          if (beforeFilter > tickets.length) {
            const filterReason = cutoffDate 
              ? (daysToFilter !== undefined && daysToFilter > 0 
                  ? `older than ${daysToFilter} days` 
                  : 'older than 2023-01-01 (default filter)')
              : 'with invalid dates'
            console.log(`[getTicketsByCompanyName] Client-side filter removed ${beforeFilter - tickets.length} tickets (${filterReason})`)
          }
        }
        
        // Client-side sort by date as fallback (in case API doesn't respect sort parameter)
        // ALWAYS sort client-side to ensure correct order regardless of API behavior
        if (input.sortByDate !== false && tickets.length > 0) {
          console.log(`[getTicketsByCompanyName] Sorting ${tickets.length} tickets by date (DESC - most recent first)`)
          
          // Log first few tickets before sorting to see what API returned
          if (tickets.length > 0) {
            const sampleDates = tickets.slice(0, 3).map((t: any) => ({
              id: t.id,
              lastActivityDate: t.lastActivityDate,
              createDate: t.createDate,
            }))
            console.log(`[getTicketsByCompanyName] Sample tickets before sort:`, JSON.stringify(sampleDates, null, 2))
          }
          
          tickets.sort((a: any, b: any) => {
            // Try multiple date fields in order of preference
            const getDate = (ticket: any): Date | null => {
              // Try lastActivityDate first (most recent activity)
              if (ticket.lastActivityDate) {
                const d = new Date(ticket.lastActivityDate)
                if (!isNaN(d.getTime())) return d
              }
              // Fall back to createDate
              if (ticket.createDate) {
                const d = new Date(ticket.createDate)
                if (!isNaN(d.getTime())) return d
              }
              // Try dateLastModified
              if (ticket.dateLastModified) {
                const d = new Date(ticket.dateLastModified)
                if (!isNaN(d.getTime())) return d
              }
              return null
            }
            
            const dateA = getDate(a)
            const dateB = getDate(b)
            
            // If both have dates, sort DESC (most recent first) - larger date comes first
            if (dateA && dateB) {
              const diff = dateB.getTime() - dateA.getTime()
              return diff
            }
            // If only one has a date, prioritize it (put it first)
            if (dateA && !dateB) return -1
            if (!dateA && dateB) return 1
            // If neither has a date, maintain original order
            return 0
          })
          
          // Log first few tickets after sorting to verify
          if (tickets.length > 0) {
            const sampleDates = tickets.slice(0, 3).map((t: any) => ({
              id: t.id,
              lastActivityDate: t.lastActivityDate,
              createDate: t.createDate,
            }))
            console.log(`[getTicketsByCompanyName] Sample tickets after sort:`, JSON.stringify(sampleDates, null, 2))
          }
          
          // After sorting, take only the requested number of tickets (most recent first)
          const requestedCount = input.maxRecords || 5
          if (tickets.length > requestedCount) {
            console.log(`[getTicketsByCompanyName] Taking top ${requestedCount} tickets from ${tickets.length} sorted tickets`)
            tickets = tickets.slice(0, requestedCount)
          }
        }
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  companyName: input.companyName,
                  companyID: companyId,
                  totalTicketsReturned: tickets.length,
                  maxRecordsRequested: input.maxRecords || 50,
                  sortedBy: input.sortByDate !== false ? 'lastActivityDate DESC (most recent first, client-side sorted)' : 'none',
                  dateFilter: input.daysAgo === 0 
                    ? 'No date filter (explicitly requested)' 
                    : input.daysAgo !== undefined && input.daysAgo > 0 
                      ? `Last ${input.daysAgo} days (filtered client-side by lastActivityDate)` 
                      : 'Default filter: tickets from 2023-01-01 onwards (filtered client-side, excludes very old/invalid dates)',
                  dateRange: tickets.length > 0 ? (() => {
                    // Only use valid dates (not null, not epoch, not invalid)
                    const dates = tickets.map((t: any) => {
                      // Try lastActivityDate first
                      if (t.lastActivityDate) {
                        const d = new Date(t.lastActivityDate)
                        if (!isNaN(d.getTime()) && d.getTime() > 0) return d
                      }
                      // Fall back to createDate
                      if (t.createDate) {
                        const d = new Date(t.createDate)
                        if (!isNaN(d.getTime()) && d.getTime() > 0) return d
                      }
                      return null
                    }).filter((d): d is Date => d !== null && d.getTime() > 0)
                    
                    if (dates.length === 0) return 'No valid dates found'
                    dates.sort((a, b) => b.getTime() - a.getTime())
                    const newest = dates[0]
                    const oldest = dates[dates.length - 1]
                    const daysSinceNewest = Math.floor((Date.now() - newest.getTime()) / (1000 * 60 * 60 * 24))
                    return {
                      newest: newest.toISOString().split('T')[0],
                      oldest: oldest.toISOString().split('T')[0],
                      daysSinceNewest: daysSinceNewest,
                      warning: daysSinceNewest > 180 ? `Most recent ticket is ${daysSinceNewest} days old. Consider using a smaller daysAgo value (e.g., 90, 180) to see more recent tickets if they exist.` : null
                    }
                  })() : null,
                  note: tickets.length > 0 ? (() => {
                    // Get the first ticket's date (should be most recent after sorting)
                    const firstTicket = tickets[0]
                    let newestDate: Date | null = null
                    
                    if (firstTicket?.lastActivityDate) {
                      const d = new Date(firstTicket.lastActivityDate)
                      if (!isNaN(d.getTime()) && d.getTime() > 0) newestDate = d
                    }
                    if (!newestDate && firstTicket?.createDate) {
                      const d = new Date(firstTicket.createDate)
                      if (!isNaN(d.getTime()) && d.getTime() > 0) newestDate = d
                    }
                    
                    if (!newestDate) {
                      return 'WARNING: Could not determine ticket dates. Some tickets may have invalid or missing date fields.'
                    }
                    
                    const daysSinceNewest = Math.floor((Date.now() - newestDate.getTime()) / (1000 * 60 * 60 * 24))
                    if (daysSinceNewest > 180) {
                      return `WARNING: The most recent ticket is ${daysSinceNewest} days old (from ${newestDate.toISOString().split('T')[0]}). These may be the only tickets for this company, or you may want to try a smaller daysAgo value to check for more recent tickets. Tickets are automatically sorted by date (client-side fallback ensures correct order).`
                    }
                    return 'These are the most recent tickets automatically sorted by date (client-side fallback ensures correct order). No counting or enumeration needed - the tool handles all filtering server-side.'
                  })() : 'No tickets found in the specified date range.',
                  tickets: tickets,
                },
                null,
                2,
              ),
            },
          ],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        // Log the error for debugging
        console.error('getTicketsByCompanyName error:', {
          companyName: input.companyName,
          error: msg,
        })
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  error: 'Failed to get tickets by company name',
                  message: msg,
                  suggestion: 'Verify the company name is correct. If the company exists, try using a partial name or check spelling.',
                  toolUsed: 'getTicketsByCompanyName',
                  companyName: input.companyName,
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        }
      }
    },
  )
  
  server.tool(
    'ticketCategoriesUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketCategoriesQueryCount',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketCategoriesUrlParameterQuery',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/query`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketCategoriesQuery',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketCategoriesQueryItem',
    `Generated from Postman`,
    { id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  // Removed: ticketCategoriesQueryFieldDefinitions, ticketCategoriesQueryUserDefinedFieldDefinitions, ticketCategoriesQueryEntityInformation (metadata queries not needed)
  server.tool(
    'ticketCategoriesQueryEntityInformation',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketCategoryFieldDefaultsChildQueryItem',
    `Generated from Postman`,
    { parentId: z.string(), id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/${input.parentId}/FieldDefaults/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  // Removed: ticketCategoryFieldDefaultsChildQueryFieldDefinitions, ticketCategoryFieldDefaultsChildQueryUserDefinedFieldDefinitions, ticketCategoryFieldDefaultsChildQueryEntityInformation (metadata queries not needed)
  server.tool(
    'ticketCategoryFieldDefaultsChildQuery',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/${input.parentId}/FieldDefaults`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  // Removed: ticketCategoriesUpdateEntity, ticketCategoriesPatchEntity (write operations not needed for read-only agent)
  server.tool(
    'ticketCategoryFieldDefaultsUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketCategoryFieldDefaultsQueryCount',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketCategoryFieldDefaultsUrlParameterQuery',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/query`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketCategoryFieldDefaultsQuery',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketCategoryFieldDefaultsQueryItem',
    `Generated from Postman`,
    { id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  // Removed: ticketCategoryFieldDefaultsQueryFieldDefinitions, ticketCategoryFieldDefaultsQueryUserDefinedFieldDefinitions, ticketCategoryFieldDefaultsQueryEntityInformation (metadata queries not needed)
  server.tool(
    'ticketCategoryFieldDefaultsQueryEntityInformation',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketHistoryUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketHistory/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketHistoryQueryCount',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketHistory/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketHistoryUrlParameterQuery',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketHistory/query`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketHistoryQuery',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketHistory/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketHistoryQueryItem',
    `Generated from Postman`,
    { id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketHistory/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketHistoryQueryFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketHistory/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketHistoryQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketHistory/entityInformation/userDefinedFields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketHistoryQueryEntityInformation',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketHistory/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNoteAttachmentsQueryFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNoteAttachments/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNoteAttachmentsQueryEntityInformation',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNoteAttachments/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNoteAttachmentsUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNoteAttachments/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNoteAttachmentsQueryCount',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNoteAttachments/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNoteAttachmentsUrlParameterQuery',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNoteAttachments/query`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNoteAttachmentsQuery',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNoteAttachments/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNoteAttachmentsQueryItem',
    `Generated from Postman`,
    { id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNoteAttachments/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNoteAttachmentsChildQueryItem',
    `Generated from Postman`,
    { parentId: z.string(), id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/${input.parentId}/Attachments/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  // Removed: ticketNoteAttachmentsChildDeleteEntity (write operation not needed for read-only agent)
  server.tool(
    'ticketNoteAttachmentsChildQuery',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/${input.parentId}/Attachments`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  // Removed: ticketNoteAttachmentsChildCreateEntity (write operation not needed for read-only agent)
  server.tool(
    'ticketNotesUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesQueryCount',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesUrlParameterQuery',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/query`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesQuery',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesQueryItem',
    `Generated from Postman`,
    { id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesQueryFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/entityInformation/userDefinedFields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesQueryEntityInformation',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesChildQueryItem',
    `Generated from Postman`,
    { parentId: z.string(), id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesChildQueryFieldDefinitions',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesChildQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes/entityInformation/userDefinedFields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesChildQueryEntityInformation',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketNotesChildQuery',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  // Removed: ticketNotesChildCreateEntity, ticketNotesChildUpdateEntity, ticketNotesChildPatchEntity (write operations not needed for read-only agent)
  server.tool(
    'ticketSecondaryResourcesChildQueryItem',
    `Generated from Postman`,
    { parentId: z.string(), id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  // Removed: ticketSecondaryResourcesChildDeleteEntity (write operation not needed for read-only agent)
  server.tool(
    'ticketSecondaryResourcesChildQueryFieldDefinitions',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketSecondaryResourcesChildQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources/entityInformation/userDefinedFields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketSecondaryResourcesChildQueryEntityInformation',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketSecondaryResourcesChildQuery',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  // Removed: ticketSecondaryResourcesChildCreateEntity (write operation not needed for read-only agent)
  server.tool(
    'ticketsUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketsQueryCount',
    `⚠️ WARNING: This tool returns ONLY a number count, NEVER ticket details. ONLY use when user explicitly asks "how many" or "count" tickets. DO NOT use for "show", "list", "get", "find", "retrieve", "latest", or "recent" tickets. DO NOT use when user provides a company name - use getTicketsByCompanyName instead. DO NOT use this to enumerate tickets or determine how many tickets exist before querying - use getTicketsByCompanyName or ticketsQuery directly with maxRecords and sorting. This tool cannot filter by companyName field (that field does not exist in tickets).`,
    { body: z.any() },
    async (input, extra) => {
      try {
        // Validate that filter doesn't contain companyName (which doesn't exist in Ticket entity)
        if (input.body && typeof input.body === 'object') {
          const bodyStr = JSON.stringify(input.body)
          if (bodyStr.includes('companyName') || bodyStr.includes('"field":"companyName"')) {
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    {
                      error: 'Invalid filter field',
                      message: 'The field "companyName" does not exist in the Ticket entity. Tickets are filtered by "companyID", not "companyName".',
                      suggestion: 'If you need tickets by company name, use the getTicketsByCompanyName tool instead. It will find the company ID automatically and return actual ticket details.',
                      alternativeTool: 'getTicketsByCompanyName',
                    },
                    null,
                    2,
                  ),
                },
              ],
              isError: true,
            }
          }
        }

        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        // Check if error mentions companyName
        if (msg.includes('companyName') || msg.includes('Unable to find companyName')) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    error: 'Invalid filter field',
                    message: 'The field "companyName" does not exist in the Ticket entity. Tickets are filtered by "companyID", not "companyName".',
                    suggestion: 'If you need tickets by company name, use the getTicketsByCompanyName tool instead. It will find the company ID automatically and return actual ticket details.',
                    alternativeTool: 'getTicketsByCompanyName',
                    originalError: msg,
                  },
                  null,
                  2,
                ),
              },
            ],
            isError: true,
          }
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  error: 'Failed to count tickets',
                  message: msg,
                  suggestion: 'Check your filter criteria. Remember: tickets are filtered by companyID, not companyName. Use getTicketsByCompanyName tool for company name searches.',
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketsUrlParameterQuery',
    `Simple text search for tickets. Use this for quick searches by ticket number, title, or description text. Returns limited results. For complex queries with filters, use ticketsQuery instead.`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/query`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        
        // Format and truncate response
        const formatted = formatResponse(data)
        const responseText = truncateResponse(formatted)
        
        return {
          content: [{ type: 'text', text: responseText }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  error: 'Failed to search tickets',
                  message: msg,
                  suggestion: 'Try a more specific search term or use ticketsQuery for complex searches',
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketsQuery',
    `Use this to GET, SHOW, LIST, FIND, or RETRIEVE actual ticket details and information. This returns full ticket records with all details. When user asks to "show tickets", "list tickets", "get tickets", "find tickets", "latest tickets", or "recent tickets" - ALWAYS use this tool, NOT ticketsQueryCount. For tickets by company name, prefer getTicketsByCompanyName tool. When querying by company ID directly, use this tool with companyID filter. Always include maxRecords parameter (default is 20, maximum is 100) to limit response size. Returns ticket information including ID, number, title, status, priority, company, contact, dates, and category.`,
    {
      body: z.object({
        filter: z.array(z.any()).optional(),
        maxRecords: z.number().max(100).optional(),
        sort: z.array(z.any()).optional(),
        fields: z.array(z.string()).optional(),
      }),
    },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/query`
        
        // If no sort is specified and user likely wants recent tickets, add default sort by date
        const bodyWithDefaults = { ...input.body }
        if (!bodyWithDefaults.sort && (!bodyWithDefaults.filter || bodyWithDefaults.filter.length === 0)) {
          // Default to sorting by date DESC for "most recent" queries
          bodyWithDefaults.sort = [{ field: 'lastActivityDate', direction: 'DESC' }]
        }
        
        const optimizedBody = enforceMaxRecords(bodyWithDefaults)
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(optimizedBody),
        })
        
        // Format and truncate response if needed
        const formatted = formatResponse(data)
        const responseText = truncateResponse(formatted)
        
        // Client-side sort as fallback if sort was requested
        let sortedData = formatted
        try {
          const parsed = JSON.parse(responseText)
          let tickets: any[] = []
          
          if (Array.isArray(parsed)) {
            tickets = parsed
          } else if (parsed && typeof parsed === 'object') {
            tickets = (parsed as any).items || (parsed as any).data || [parsed]
          }
          
          // Sort by date if sort was specified in request
          if (optimizedBody.sort && tickets.length > 0) {
            const sortField = optimizedBody.sort[0]?.field || 'lastActivityDate'
            const sortDirection = optimizedBody.sort[0]?.direction || 'DESC'
            
            tickets.sort((a: any, b: any) => {
              const getDate = (ticket: any): Date | null => {
                // Try the specified sort field first
                if (ticket[sortField]) {
                  const d = new Date(ticket[sortField])
                  if (!isNaN(d.getTime())) return d
                }
                // Fallback to common date fields
                if (ticket.lastActivityDate) {
                  const d = new Date(ticket.lastActivityDate)
                  if (!isNaN(d.getTime())) return d
                }
                if (ticket.createDate) {
                  const d = new Date(ticket.createDate)
                  if (!isNaN(d.getTime())) return d
                }
                return null
              }
              
              const dateA = getDate(a)
              const dateB = getDate(b)
              
              if (dateA && dateB) {
                return sortDirection === 'DESC' 
                  ? dateB.getTime() - dateA.getTime()
                  : dateA.getTime() - dateB.getTime()
              }
              if (dateA && !dateB) return -1
              if (!dateA && dateB) return 1
              return 0
            })
            
            // Reconstruct the response with sorted tickets
            if (Array.isArray(parsed)) {
              sortedData = tickets
            } else {
              sortedData = { ...parsed, items: tickets, data: tickets }
            }
          }
        } catch (e) {
          // If parsing fails, use original formatted response
        }
        
        return {
          content: [{ type: 'text', text: JSON.stringify(sortedData, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  error: 'Failed to query tickets',
                  message: msg,
                  suggestion:
                    'Check your filters and ensure maxRecords is set (recommended range is 20 to 50)',
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'companiesQuery',
    `Query companies with filters. Use this to find a company by name, account number, or other criteria. When a user asks for tickets by company name, first use this tool to find the company ID, then use ticketsQuery with that company ID. Always include maxRecords parameter (default is 20, maximum is 100). Returns company information including ID, companyName, accountNumber, phone, address, and other details.`,
    {
      body: z.object({
        filter: z.array(z.any()).optional(),
        maxRecords: z.number().max(100).optional(),
        sort: z.array(z.any()).optional(),
      }),
    },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Companies/query`
        const optimizedBody = enforceMaxRecords(input.body)
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(optimizedBody),
        })
        
        const formatted = formatResponse(data)
        const responseText = truncateResponse(formatted)
        
        return {
          content: [{ type: 'text', text: responseText }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  error: 'Failed to query companies',
                  message: msg,
                  suggestion:
                    'Check your filters and ensure maxRecords is set (recommended range is 20 to 50)',
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'companiesUrlParameterQuery',
    `Simple text search for companies by name. Use this to quickly find a company by searching for its name. When a user asks for tickets by company name, first use this tool to find the company, then use the company ID with ticketsQuery. Returns limited results.`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Companies/query`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        
        const formatted = formatResponse(data)
        const responseText = truncateResponse(formatted)
        
        return {
          content: [{ type: 'text', text: responseText }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  error: 'Failed to search companies',
                  message: msg,
                  suggestion: 'Try a more specific search term or use companiesQuery for complex searches',
                },
                null,
                2,
              ),
            },
          ],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketsQueryItem',
    `Get a specific ticket by its ID. Use this when you have a ticket ID or ticket number and need full details. Returns complete ticket information including status, priority, category, company, contact, dates, and description.`,
    { id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketsQueryFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketsQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/entityInformation/userDefinedFields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketsQueryEntityInformation',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  // Removed: ticketsCreateEntity, ticketsUpdateEntity, ticketsPatchEntity (write operations not needed for read-only agent)
  server.tool(
    'ticketSecondaryResourcesUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketSecondaryResourcesQueryCount',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketSecondaryResourcesUrlParameterQuery',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/query`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
          params: { search: input.search },
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketSecondaryResourcesQuery',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(input.body),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketSecondaryResourcesQueryItem',
    `Generated from Postman`,
    { id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketSecondaryResourcesQueryFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketSecondaryResourcesQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/entityInformation/userDefinedFields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
  server.tool(
    'ticketSecondaryResourcesQueryEntityInformation',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: getAutotaskHeaders(),
        })
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text', text: `Error: ${msg}` }],
          isError: true,
        }
      }
    },
  )
}
