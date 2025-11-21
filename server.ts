import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { registerTools } from './tools.js'
import { registerResources } from './resources.js'

export const getServer = () => {
  const server = new McpServer({
    name: 'AutotaskMCP',
    version: '1.0.0',
  })

  registerTools(server)
  registerResources(server)

  return server
}
