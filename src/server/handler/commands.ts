import { getCommand } from './getCommand.js'
import { Req } from './handle.js'

/**
 * Executes a controller from src/controllers
 */
export const startCommand = async (req: Req) => {
  const commandName = req.url.pathname.substring(1)
  const command = await getCommand(commandName)

  if (!command) {
    return new Response('Command not found', { status: 404 })
  }

  try {
    return await command(req)
  } catch (e: unknown) {
    return handleError(req, e)
  }
}

const handleError = (req: Req, error: any) => {
  let message = error.message

  if (error.response) {
    message = error.response.data?.error?.message ?? error.response.data?.error
  }

  console.error('handleError', error)

  return Response.json(
    {
      status: error?.response?.status ?? 400,
      code: error.code,
      message,
    },
    {
      status: error?.response?.status ?? 400,
    }
  )
}
