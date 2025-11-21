/**
 * Response utilities for optimizing large API responses
 */

const MAX_RESPONSE_SIZE = 50000 // ~50KB max response size
const DEFAULT_MAX_RECORDS = 20 // Default limit for queries
const MAX_RECORDS = 100 // Hard limit

/**
 * Truncate response if it exceeds size limit
 */
export function truncateResponse(data: any, maxSize: number = MAX_RESPONSE_SIZE): string {
  const jsonString = JSON.stringify(data, null, 2)
  
  if (jsonString.length <= maxSize) {
    return jsonString
  }
  
  // If it's an array, try to return a summary
  if (Array.isArray(data)) {
    const truncated = data.slice(0, Math.floor(data.length / 2))
    const summary = {
      totalRecords: data.length,
      returnedRecords: truncated.length,
      message: `Response truncated. Showing ${truncated.length} of ${data.length} records. Use filters or maxRecords to limit results.`,
      data: truncated,
    }
    const summaryJson = JSON.stringify(summary, null, 2)
    if (summaryJson.length <= maxSize) {
      return summaryJson
    }
  }
  
  // Last resort: return a summary message
  return JSON.stringify(
    {
      error: 'Response too large',
      message: `Response size (${jsonString.length} bytes) exceeds limit (${maxSize} bytes). Use filters, maxRecords, or more specific queries to reduce response size.`,
      recordCount: Array.isArray(data) ? data.length : 1,
      suggestion: 'Add maxRecords parameter or use more specific filters',
    },
    null,
    2,
  )
}

/**
 * Ensure maxRecords is set and within limits
 */
export function enforceMaxRecords(body: any): any {
  if (!body) return { maxRecords: DEFAULT_MAX_RECORDS }
  
  const maxRecords = body.maxRecords || DEFAULT_MAX_RECORDS
  return {
    ...body,
    maxRecords: Math.min(maxRecords, MAX_RECORDS),
  }
}

/**
 * Format response for better readability
 */
export function formatResponse(data: any, includeMetadata: boolean = true): any {
  if (Array.isArray(data)) {
    const formatted = {
      count: data.length,
      records: data,
    }
    if (includeMetadata) {
      return {
        ...formatted,
        _metadata: {
          returnedAt: new Date().toISOString(),
          recordCount: data.length,
        },
      }
    }
    return formatted
  }
  return data
}

/**
 * Extract and return only essential fields for large responses
 */
export function extractEssentialFields(
  records: any[],
  essentialFields: string[],
): any[] {
  if (!Array.isArray(records) || records.length === 0) {
    return records
  }
  
  return records.map((record) => {
    const essential: any = {}
    essentialFields.forEach((field) => {
      if (record[field] !== undefined) {
        essential[field] = record[field]
      }
    })
    return essential
  })
}

