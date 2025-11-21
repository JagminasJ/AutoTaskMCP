/**
 * Autotask API Configuration
 * These values can be set via environment variables or build arguments
 */
export const autotaskConfig = {
  apiIntegrationCode: process.env.AUTOTASK_API_INTEGRATION_CODE || '',
  userName: process.env.AUTOTASK_USER_NAME || '',
  secret: process.env.AUTOTASK_SECRET || '',
  impersonationResourceId: process.env.AUTOTASK_IMPERSONATION_RESOURCE_ID || '',
}

/**
 * Get Autotask API headers for requests
 */
export function getAutotaskHeaders(additionalHeaders: Record<string, string> = {}) {
  return {
    ApiIntegrationCode: autotaskConfig.apiIntegrationCode,
    UserName: autotaskConfig.userName,
    Secret: autotaskConfig.secret,
    ImpersonationResourceId: autotaskConfig.impersonationResourceId,
    Accept: 'application/json',
    ...additionalHeaders,
  }
}

