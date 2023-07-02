import { serve } from 'bun'
import { handleRequest } from './handler/handle.js'

const server = serve({ fetch: handleRequest })
console.log('🔥', server.port)
