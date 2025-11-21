# Copilot Studio Configuration Guide for AutotaskMCP

This guide helps you optimize your Copilot Studio agent to work effectively with the AutotaskMCP server.

## Key Optimizations Implemented

### 1. Response Size Management
- **Automatic truncation**: Responses larger than ~50KB are automatically truncated
- **Default limits**: Queries default to 20 records (max 100)
- **Smart summaries**: Large responses include summaries with record counts

### 2. Tool Descriptions
All tools now include detailed descriptions to help the agent:
- Understand when to use each tool
- Construct proper queries
- Handle responses appropriately

### 3. Error Handling
- Clear error messages with suggestions
- Guidance on fixing common issues
- Recommendations for alternative approaches

## Copilot Studio Configuration Recommendations

### 1. System Message / Instructions

Add these instructions to your Copilot Studio agent's system message:

```
You are a helpful assistant that answers questions about Autotask tickets, companies, contacts, and related information.

⚠️ CRITICAL TOOL SELECTION RULES ⚠️
- ticketsQueryCount returns ONLY a number, NEVER ticket details
- Use ticketsQueryCount ONLY when user explicitly asks "how many" or "count"
- When user asks to "show", "list", "get", "find", "retrieve", "latest", or "recent" tickets - you MUST use getTicketsByCompanyName or ticketsQuery (NOT ticketsQueryCount)
- For tickets by company name, ALWAYS use getTicketsByCompanyName tool first (it handles company lookup automatically)
- NEVER use ticketsQueryCount with companyName filter - that field does not exist in tickets. Tickets are filtered by companyID, not companyName.
- If user provides a company name, you MUST use getTicketsByCompanyName tool, NOT ticketsQueryCount

IMPORTANT GUIDELINES:
1. Always use maxRecords parameter (20-50 recommended) when querying tickets to prevent large responses
2. CRITICAL: Use ticketsQueryCount ONLY when user explicitly asks "how many" or "count" - it returns ONLY a number, NOT ticket details
3. CRITICAL: When user asks to "show", "list", "get", "find", "retrieve", "latest", or "recent" tickets - ALWAYS use ticketsQuery (NOT ticketsQueryCount) to get actual ticket details
4. Use specific filters to narrow down results before querying
5. For specific ticket details by ID, use ticketsQueryItem with the ticket ID
6. For complex queries with filters, use ticketsQuery with filters
7. For simple text searches, use ticketsUrlParameterQuery

PRIMARY TOOLS FOR COMMON QUERIES:
- getTicketsByCompanyName: Use this FIRST when user asks for tickets by company name (e.g., "show me tickets for Company Name" or "latest 5 tickets for Company Name"). This tool automatically handles company lookup and returns actual ticket details. DO NOT use ticketsQueryCount.

WORKFLOW FOR COMPANY NAME QUERIES:
OPTION 1 (RECOMMENDED): Use getTicketsByCompanyName tool directly with companyName parameter. This handles everything automatically.

OPTION 2 (Manual): If getTicketsByCompanyName is not available:
1. FIRST use companiesUrlParameterQuery with the company name to find the company
2. Extract the company ID from the search results
3. THEN use ticketsQuery (NOT ticketsQueryCount) with filter: [{"field": "companyID", "op": "eq", "value": "<company_id>"}], maxRecords: 5-20, sort: [{"field": "createDate", "direction": "DESC"}]

CRITICAL RULE: ticketsQueryCount returns ONLY a number, NEVER ticket details. 
- Use ticketsQueryCount ONLY when user explicitly asks "how many" or "count"
- Use ticketsQuery or getTicketsByCompanyName when user asks to "show", "list", "get", "find", "retrieve", "latest", or "recent" tickets

RESPONSE HANDLING:
- If you receive a truncated response, inform the user and suggest more specific filters
- If you get an error about response size, reduce maxRecords or add more filters
- Always present results in a clear, user-friendly format
```

### 2. Conversation Starters

Add these conversation starters to help users:
- "Show me the last 10 tickets for [Company Name]"
- "How many open tickets are there?"
- "What's the status of ticket [Ticket Number]?"
- "List tickets created in the last week"
- "Show me tickets by category [Category Name]"

### 3. Topics / Triggers

Create topics for common queries:
- **Ticket Status**: "What's the status of ticket [X]?"
- **Ticket History**: "Show me tickets for [Company]"
- **Ticket Count**: "How many [status/priority/category] tickets are there?"
- **Ticket Search**: "Find tickets about [search term]"

### 4. Variable Management

Store commonly used values:
- Company IDs (if frequently queried)
- Status IDs
- Priority levels
- Category IDs

### 5. Response Formatting

**For the Agent (Add to System Message):**
```
When presenting ticket information to users:
- Extract and display key fields: ticket number, title, status, priority, company name, create date
- Format multiple tickets as a numbered list or table
- For single tickets, present in a clear, readable format
- Always include the ticket number for reference
- If response was truncated, inform the user and suggest more specific filters
```

**Optional: Power Automate Flows (Advanced)**
If you want custom formatting beyond what the agent provides, you can create Power Automate flows to:
- Extract key fields (ticket number, title, status, priority)
- Present in formatted tables or cards
- Include links to full ticket details if needed

*Note: This is optional. The agent can handle formatting automatically with good instructions.*

## Best Practices

### Query Construction

**These are examples for the agent to understand - add to System Message:**

```
When constructing queries:
- Always include maxRecords (20-50 recommended) to prevent large responses
- Use specific filters to narrow results (companyID, status, priority, categoryID, dates)
- For date ranges, use createDate with "gte" (greater than or equal) and "lte" (less than or equal)
- Sort results by createDate DESC for most recent first
- Use ticketsQueryCount when only a count is needed

Example query structure:
{
  "filter": [
    { "field": "companyID", "op": "eq", "value": "123" },
    { "field": "status", "op": "eq", "value": "5" }
  ],
  "maxRecords": 20,
  "sort": [{ "field": "createDate", "direction": "DESC" }]
}
```

**Avoid:**
- Queries without maxRecords (will default to 20, but be explicit)
- Queries without filters when you know specific criteria
- Using ticketsQuery when ticketsQueryCount would suffice

### Error Handling

When you encounter errors:
1. **Response too large**: Reduce maxRecords or add more specific filters
2. **No results found**: Check filter values (IDs, status codes, etc.)
3. **Invalid filter**: Verify field names and operator syntax
4. **Timeout**: Break complex queries into smaller, more specific ones

### Natural Language Translation

**Add this table to System Message to help the agent translate user questions:**

```
When users ask questions, translate them to tools and queries:

| User Question Pattern | Use Tool | Query Approach |
|----------------------|----------|---------------|
| "How many tickets..." or "Count tickets..." | ticketsQueryCount | Filter by criteria, maxRecords not needed - returns ONLY a number, NOT ticket details |
| "Show me tickets..." or "List tickets..." or "Get tickets..." or "Latest X tickets..." | getTicketsByCompanyName or ticketsQuery | Use these to get actual ticket details, NOT ticketsQueryCount |
| "Show me tickets for [Company Name]" or "Latest X tickets for [Company Name]" | getTicketsByCompanyName (PREFERRED) | Use getTicketsByCompanyName with companyName parameter - handles everything automatically, returns actual ticket details |
| "Show me tickets for [Company Name]" (if getTicketsByCompanyName unavailable) | First companiesUrlParameterQuery, then ticketsQuery | Search company by name first, get company ID, then use ticketsQuery (NOT ticketsQueryCount) with companyID filter, maxRecords 5-20, sort DESC |
| "What's the status of ticket [X]" | ticketsQueryItem | Use ticket ID or number |
| "Recent tickets" or "Latest tickets" | ticketsQuery | Filter by createDate (last 7-30 days), sort DESC, set maxRecords to 10-20 - use ticketsQuery NOT ticketsQueryCount |
| "Tickets by priority [X]" | ticketsQuery | Filter by priority field, set maxRecords to 20 - use ticketsQuery NOT ticketsQueryCount |
| "Tickets in category [X]" | ticketsQuery | Filter by categoryID, set maxRecords to 20 - use ticketsQuery NOT ticketsQueryCount |
| "Tickets for contact [X]" | ticketsQuery | Filter by contactID, set maxRecords to 20 - use ticketsQuery NOT ticketsQueryCount |
| "Open tickets" or "Closed tickets" | ticketsQuery | Filter by status field, set maxRecords to 20 - use ticketsQuery NOT ticketsQueryCount |
```

## Monitoring and Troubleshooting

### Check Response Sizes
- Monitor logs for truncation warnings
- Adjust maxRecords based on typical response sizes
- Use ticketsQueryCount for large datasets

### Common Issues

1. **"Response too large" error**
   - Solution: Reduce maxRecords or add more filters
   - Use ticketsQueryCount instead of ticketsQuery when possible

2. **Agent not using correct tool**
   - Solution: Improve tool descriptions in system message
   - Add examples in conversation starters

3. **"Unexpected characters" or "ContentValidationError" with colon**
   - Solution: This usually happens when Copilot Studio interprets colons in tool descriptions or JSON as formula syntax
   - Ensure tool descriptions don't use colons in formula-like patterns (use "is" or "equals" instead of ":")
   - When constructing JSON in tool calls, use proper JSON syntax without formula-like expressions
   - If error persists, check Power Automate flows for any expressions that might be parsing tool responses incorrectly

3. **Slow responses**
   - Solution: Use more specific filters
   - Consider caching frequently accessed data

4. **Incomplete results**
   - Solution: Check if response was truncated
   - Use pagination if needed (multiple queries with different offsets)

## Advanced Configuration

### Custom Power Automate Flows (Optional)

**Only create these if you need custom formatting that the agent can't handle:**
- Format ticket responses into cards with specific styling
- Extract and summarize key information in a specific format
- Handle pagination for large result sets automatically
- Cache frequently accessed data

**Note:** The agent can handle most formatting automatically with good instructions. Only use Power Automate if you need very specific formatting requirements.

### Response Post-Processing (Optional)

**If using Power Automate flows**, after receiving MCP responses:
1. Parse JSON response
2. Extract essential fields
3. Format for user-friendly display
4. Add navigation/action buttons if needed

**For most use cases, the agent instructions above are sufficient.**

## Testing

Test these scenarios:
1. ✅ Simple ticket lookup by ID
2. ✅ Company ticket list (with maxRecords)
3. ✅ Ticket count queries
4. ✅ Filtered queries (status, priority, category)
5. ✅ Date range queries
6. ✅ Text search queries
7. ✅ Large result set handling

## Support

If you encounter issues:
1. Check MCP server logs for errors
2. Verify API credentials are correct
3. Test queries directly against Autotask API
4. Review response sizes and adjust maxRecords
5. Check Copilot Studio agent logs for tool call errors

