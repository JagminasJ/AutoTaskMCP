import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Register MCP Resources for Autotask API
 * Resources help agents understand available data structures and provide context
 */
export function registerResources(server: McpServer) {
  // Resource: API Documentation
  server.resource(
    'api-documentation',
    'autotask://api-documentation',
    async () => {
      return {
        contents: [
          {
            uri: 'autotask://api-documentation',
            text: JSON.stringify(
              {
                title: 'Autotask REST API Documentation',
                description:
                  'This MCP server provides access to Autotask REST API endpoints',
                availableEntities: [
                  'Tickets',
                  'TicketCategories',
                  'Companies',
                  'Contacts',
                  'Projects',
                  'Tasks',
                  'TimeEntries',
                ],
                commonOperations: {
                  query: 'Use POST /query endpoints with filter objects',
                  queryCount: 'Use POST /query/count endpoints to get record counts',
                  getById: 'Use GET /{entity}/{id} endpoints to retrieve specific records',
                  search: 'Use GET /query?search= endpoints for simple searches',
                },
                exampleQueries: {
                  ticketsByCompany:
                    'Use ticketsQuery tool with body: { filter: [{ field: "companyID", op: "eq", value: "123" }], maxRecords: 20 }',
                  recentTickets:
                    'Use ticketsQuery with body: { filter: [{ field: "createDate", op: "gte", value: "2024-01-01T00:00:00" }], maxRecords: 10, sort: [{ field: "createDate", direction: "DESC" }] }',
                  ticketCount:
                    'Use ticketsQueryCount tool with filter object to get count of matching tickets (returns only count, not records)',
                  ticketByStatus:
                    'Use ticketsQuery with body: { filter: [{ field: "status", op: "eq", value: "STATUS_ID" }], maxRecords: 20 }',
                },
                responseOptimization: {
                  alwaysUseMaxRecords: 'Always include maxRecords (20-50 recommended) to prevent large responses',
                  useCountForNumbers: 'Use *QueryCount tools when only the count is needed, not full records',
                  useSpecificFilters: 'Add specific filters to reduce result set size',
                  responseLimit: 'Responses are automatically truncated at ~50KB to prevent errors',
                },
                authentication: {
                  note: 'Authentication is handled automatically via configured credentials',
                  requiredHeaders: [
                    'ApiIntegrationCode',
                    'UserName',
                    'Secret',
                    'ImpersonationResourceId',
                  ],
                },
              },
              null,
              2,
            ),
          },
        ],
      }
    },
  )

  // Resource: Query Examples
  server.resource(
    'query-examples',
    'autotask://query-examples',
    async () => {
      return {
        contents: [
          {
            uri: 'autotask://query-examples',
            text: JSON.stringify(
              {
                examples: [
                  {
                    name: 'Get last 5 tickets for a company',
                    description:
                      'Query the most recent tickets created for a specific company',
                    tool: 'ticketsQuery',
                    body: {
                      filter: [
                        {
                          field: 'companyID',
                          op: 'eq',
                          value: 'COMPANY_ID_HERE',
                        },
                      ],
                      maxRecords: 5,
                      sort: [{ field: 'createDate', direction: 'DESC' }],
                    },
                  },
                  {
                    name: 'Count tickets by status',
                    description: 'Get count of tickets in a specific status',
                    tool: 'ticketsQueryCount',
                    body: {
                      filter: [
                        {
                          field: 'status',
                          op: 'eq',
                          value: 'STATUS_ID_HERE',
                        },
                      ],
                    },
                  },
                  {
                    name: 'Search tickets by title',
                    description: 'Simple text search in ticket titles',
                    tool: 'ticketsUrlParameterQuery',
                    params: {
                      search: 'search term here',
                    },
                  },
                  {
                    name: 'Get ticket categories',
                    description: 'Retrieve all ticket categories',
                    tool: 'ticketCategoriesQuery',
                    body: {
                      maxRecords: 100,
                    },
                  },
                ],
                filterOperators: [
                  'eq - equals',
                  'noteq - not equals',
                  'gt - greater than',
                  'gte - greater than or equal',
                  'lt - less than',
                  'lte - less than or equal',
                  'beginsWith - string begins with',
                  'endsWith - string ends with',
                  'contains - string contains',
                  'exists - field exists',
                  'notexists - field does not exist',
                ],
                sortDirections: ['ASC', 'DESC'],
              },
              null,
              2,
            ),
          },
        ],
      }
    },
  )

  // Resource: Entity Information
  server.resource(
    'entity-info',
    'autotask://entity-info',
    async () => {
      return {
        contents: [
          {
            uri: 'autotask://entity-info',
            text: JSON.stringify(
              {
                entities: {
                  Tickets: {
                    description:
                      'Service tickets representing customer issues or requests',
                    keyFields: [
                      'id',
                      'ticketNumber',
                      'title',
                      'companyID',
                      'contactID',
                      'status',
                      'priority',
                      'createDate',
                      'dueDateTime',
                    ],
                    relatedEntities: ['Companies', 'Contacts', 'TicketCategories'],
                    commonQueries: [
                      'ticketsQuery - Query tickets with filters',
                      'ticketsQueryCount - Count tickets matching criteria',
                      'ticketsUrlParameterQuery - Simple search by text',
                    ],
                  },
                  TicketCategories: {
                    description:
                      'Categories for organizing and classifying tickets',
                    keyFields: ['id', 'name', 'displayColorRGB'],
                    relatedEntities: ['Tickets'],
                    commonQueries: [
                      'ticketCategoriesQuery - Get all categories',
                      'ticketCategoriesQueryCount - Count categories',
                    ],
                  },
                  Companies: {
                    description: 'Customer companies in Autotask',
                    keyFields: [
                      'id',
                      'companyName',
                      'accountNumber',
                      'phone',
                      'address1',
                      'city',
                      'state',
                      'postalCode',
                    ],
                    relatedEntities: ['Tickets', 'Contacts', 'Projects'],
                  },
                },
                relationships: {
                  'Tickets -> Companies': 'Tickets belong to companies via companyID',
                  'Tickets -> Contacts': 'Tickets are assigned to contacts via contactID',
                  'Tickets -> TicketCategories':
                    'Tickets are categorized via categoryID',
                },
              },
              null,
              2,
            ),
          },
        ],
      }
    },
  )

  // Resource: Available Tools
  server.resource(
    'available-tools',
    'autotask://available-tools',
    async () => {
      return {
        contents: [
          {
            uri: 'autotask://available-tools',
            text: JSON.stringify(
              {
                ticketTools: [
                  {
                    name: 'ticketsQuery',
                    method: 'POST',
                    description:
                      'Query tickets with complex filters, sorting, and pagination',
                    useCase: 'Complex queries with multiple filters',
                    input: 'body (object with filter, maxRecords, sort, etc.)',
                  },
                  {
                    name: 'ticketsQueryCount',
                    method: 'POST',
                    description: 'Get count of tickets matching filter criteria - returns ONLY a number, NOT ticket details',
                    useCase: 'ONLY when user explicitly asks "how many" or "count" - DO NOT use for "show", "list", "get", or "find" tickets',
                    input: 'body (object with filter)',
                    warning: 'This returns only a count number, never use when user wants to see ticket details',
                  },
                  {
                    name: 'ticketsUrlParameterQuery',
                    method: 'GET',
                    description: 'Simple text search in tickets',
                    useCase: 'Quick search by text in ticket fields',
                    input: 'search (string parameter)',
                  },
                  {
                    name: 'ticketsQueryItem',
                    method: 'GET',
                    description: 'Get a specific ticket by ID',
                    useCase: 'Retrieve details of a specific ticket',
                    input: 'id (string)',
                  },
                ],
                companyTools: [
                  {
                    name: 'companiesQuery',
                    method: 'POST',
                    description: 'Query companies with filters',
                    useCase: 'Find companies by name, account number, or other criteria',
                    input: 'body (object with filter, maxRecords, sort)',
                    note: 'Use this to find company ID when user provides company name',
                  },
                  {
                    name: 'companiesUrlParameterQuery',
                    method: 'GET',
                    description: 'Simple text search for companies by name',
                    useCase: 'Quick search for company by name to get company ID',
                    input: 'search (string parameter)',
                    note: 'First step when user asks for tickets by company name',
                  },
                ],
                categoryTools: [
                  {
                    name: 'ticketCategoriesQuery',
                    description: 'Query ticket categories',
                  },
                  {
                    name: 'ticketCategoriesQueryCount',
                    description: 'Count ticket categories',
                  },
                  {
                    name: 'ticketCategoriesUrlParameterQuery',
                    description: 'Search ticket categories by text',
                  },
                ],
                toolSelection: {
                  simpleSearch: 'Use *UrlParameterQuery tools',
                  complexFiltering: 'Use *Query tools with body parameter',
                  countOnly: 'Use *QueryCount tools',
                  singleRecord: 'Use *QueryItem tools',
                },
                workflows: {
                  ticketsByCompanyName: [
                    'Step 1: Use companiesUrlParameterQuery with company name to find company',
                    'Step 2: Extract company ID from the results',
                    'Step 3: Use ticketsQuery with filter: [{"field": "companyID", "op": "eq", "value": "<id>"}], maxRecords: 5-20, sort: [{"field": "createDate", "direction": "DESC"}]',
                  ],
                },
              },
              null,
              2,
            ),
          },
        ],
      }
    },
  )
}

