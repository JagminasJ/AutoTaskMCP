import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { registerTools } from './tools.ts'

export const getServer = () => {
  const server = new McpServer({
    name: 'AutotaskMCP',
    version: '1.0.0',
  })

  registerTools(server)

  return server
}
