import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { callApi } from './postman'

export function registerTools(server: McpServer) {
  server.tool(
    'ticketCategoriesUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoriesQueryFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoriesQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/entityInformation/userDefinedFields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoriesQueryEntityInformation',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoryFieldDefaultsChildQueryFieldDefinitions',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/${input.parentId}/FieldDefaults/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoryFieldDefaultsChildQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/${input.parentId}/FieldDefaults/entityInformation/userDefinedFields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoryFieldDefaultsChildQueryEntityInformation',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/${input.parentId}/FieldDefaults/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoryFieldDefaultsChildQuery',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/${input.parentId}/FieldDefaults`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoriesUpdateEntity',
    `Generated from Postman`,
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories`
        const data = await callApi(baseUrl, {
          method: 'PUT',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketCategoriesPatchEntity',
    `Generated from Postman`,
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories`
        const data = await callApi(baseUrl, {
          method: 'PATCH',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketCategoryFieldDefaultsUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoryFieldDefaultsQueryFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoryFieldDefaultsQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/entityInformation/userDefinedFields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketCategoryFieldDefaultsQueryEntityInformation',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/entityInformation`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketHistory/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketHistory/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNoteAttachments/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNoteAttachments/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketNoteAttachmentsChildDeleteEntity',
    `Generated from Postman`,
    { parentId: z.string(), id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/${input.parentId}/Attachments/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'DELETE',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketNoteAttachmentsChildQuery',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/${input.parentId}/Attachments`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketNoteAttachmentsChildCreateEntity',
    `Generated from Postman`,
    { parentId: z.string(), body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/${input.parentId}/Attachments`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketNotesUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketNotesChildCreateEntity',
    `Generated from Postman`,
    { parentId: z.string(), body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketNotesChildUpdateEntity',
    `Generated from Postman`,
    { parentId: z.string(), body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes`
        const data = await callApi(baseUrl, {
          method: 'PUT',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketNotesChildPatchEntity',
    `Generated from Postman`,
    { parentId: z.string(), body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes`
        const data = await callApi(baseUrl, {
          method: 'PATCH',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketSecondaryResourcesChildQueryItem',
    `Generated from Postman`,
    { parentId: z.string(), id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketSecondaryResourcesChildDeleteEntity',
    `Generated from Postman`,
    { parentId: z.string(), id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'DELETE',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketSecondaryResourcesChildQueryFieldDefinitions',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources/entityInformation/fields`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketSecondaryResourcesChildCreateEntity',
    `Generated from Postman`,
    { parentId: z.string(), body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketsUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    `Generated from Postman`,
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketsUrlParameterQuery',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/query`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketsQuery',
    `Generated from Postman`,
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketsQueryItem',
    `Generated from Postman`,
    { id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    'ticketsCreateEntity',
    `Generated from Postman`,
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketsUpdateEntity',
    `Generated from Postman`,
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets`
        const data = await callApi(baseUrl, {
          method: 'PUT',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketsPatchEntity',
    `Generated from Postman`,
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets`
        const data = await callApi(baseUrl, {
          method: 'PATCH',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    'ticketSecondaryResourcesUrlParameterQueryCount',
    `Generated from Postman`,
    { search: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/query/count`
        const data = await callApi(baseUrl, {
          method: 'GET',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/query/count`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
    { body: z.object() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketSecondaryResources/query`
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
          headers: {
            ApiIntegrationCode: 'string',
            UserName: 'string',
            Secret: 'string',
            ImpersonationResourceId: 'string',
            Accept: 'application/json',
          },
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
