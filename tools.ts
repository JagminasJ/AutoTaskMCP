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
  server.tool(
    'ticketCategoriesQueryFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/entityInformation/fields`
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
    'ticketCategoriesQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/entityInformation/userDefinedFields`
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
  server.tool(
    'ticketCategoryFieldDefaultsChildQueryFieldDefinitions',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/${input.parentId}/FieldDefaults/entityInformation/fields`
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
    'ticketCategoryFieldDefaultsChildQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/${input.parentId}/FieldDefaults/entityInformation/userDefinedFields`
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
    'ticketCategoryFieldDefaultsChildQueryEntityInformation',
    `Generated from Postman`,
    { parentId: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories/${input.parentId}/FieldDefaults/entityInformation`
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
  server.tool(
    'ticketCategoriesUpdateEntity',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories`
        const data = await callApi(baseUrl, {
          method: 'PUT',
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
    'ticketCategoriesPatchEntity',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategories`
        const data = await callApi(baseUrl, {
          method: 'PATCH',
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
  server.tool(
    'ticketCategoryFieldDefaultsQueryFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/entityInformation/fields`
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
    'ticketCategoryFieldDefaultsQueryUserDefinedFieldDefinitions',
    `Generated from Postman`,
    {},
    async () => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketCategoryFieldDefaults/entityInformation/userDefinedFields`
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
  server.tool(
    'ticketNoteAttachmentsChildDeleteEntity',
    `Generated from Postman`,
    { parentId: z.string(), id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/${input.parentId}/Attachments/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'DELETE',
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
  server.tool(
    'ticketNoteAttachmentsChildCreateEntity',
    `Generated from Postman`,
    { parentId: z.string(), body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/TicketNotes/${input.parentId}/Attachments`
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
  server.tool(
    'ticketNotesChildCreateEntity',
    `Generated from Postman`,
    { parentId: z.string(), body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes`
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
    'ticketNotesChildUpdateEntity',
    `Generated from Postman`,
    { parentId: z.string(), body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes`
        const data = await callApi(baseUrl, {
          method: 'PUT',
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
    'ticketNotesChildPatchEntity',
    `Generated from Postman`,
    { parentId: z.string(), body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/Notes`
        const data = await callApi(baseUrl, {
          method: 'PATCH',
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
  server.tool(
    'ticketSecondaryResourcesChildDeleteEntity',
    `Generated from Postman`,
    { parentId: z.string(), id: z.string() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources/${input.id}`
        const data = await callApi(baseUrl, {
          method: 'DELETE',
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
  server.tool(
    'ticketSecondaryResourcesChildCreateEntity',
    `Generated from Postman`,
    { parentId: z.string(), body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets/${input.parentId}/SecondaryResources`
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
    `ONLY use this when the user explicitly asks "how many" or "count" tickets. This returns ONLY a number, NOT ticket details. DO NOT use this when user asks to "show", "list", "get", "find", or "retrieve" tickets - use ticketsQuery instead. This tool returns only a count number, never ticket information.`,
    { body: z.any() },
    async (input, extra) => {
      try {
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
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  error: 'Failed to count tickets',
                  message: msg,
                  suggestion: 'Check your filter criteria',
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
    `Use this to GET, SHOW, LIST, FIND, or RETRIEVE actual ticket details and information. This returns full ticket records with all details. When user asks to "show tickets", "list tickets", "get tickets", "find tickets", "latest tickets", or "recent tickets" - ALWAYS use this tool, NOT ticketsQueryCount. When querying by company name, first use companiesQuery or companiesUrlParameterQuery to find the company ID, then use that ID in the filter with field "companyID". Always include maxRecords parameter (default is 20, maximum is 100) to limit response size. Returns ticket information including ID, number, title, status, priority, company, contact, dates, and category.`,
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
        const optimizedBody = enforceMaxRecords(input.body)
        const data = await callApi(baseUrl, {
          method: 'POST',
          headers: getAutotaskHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(optimizedBody),
        })
        
        // Format and truncate response if needed
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
  server.tool(
    'ticketsCreateEntity',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets`
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
    'ticketsUpdateEntity',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets`
        const data = await callApi(baseUrl, {
          method: 'PUT',
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
    'ticketsPatchEntity',
    `Generated from Postman`,
    { body: z.any() },
    async (input, extra) => {
      try {
        const baseUrl = `https://webservices15.autotask.net/ATServicesRest/V1.0/Tickets`
        const data = await callApi(baseUrl, {
          method: 'PATCH',
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
