import path from 'path'
import { Req } from './handle.js'

const commandMap = new Map<
  string,
  null | ((req: Req) => Promise<Response | any>)
>()

/**
 * Reads the src/controllers directory, and loads a module with
 * `commandName` to memory. We avoid repeat `require` calls to improve
 * performance.
 *
 * This is just a simple cache + filter.
 */
const warmupCommand = async (commandName: string) => {
  if (commandMap.has(commandName)) {
    return
  }

  if (!commandName.match(/^[a-zA-Z0-9/]+$/)) {
    if (commandName !== '/favicon.ico') {
      console.error('Invalid command name', commandName)
    }
    commandMap.set(commandName, null)
    return
  }

  const commandPath = path.join(
    __dirname,
    '../../controllers',
    commandName + '.js'
  )
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(commandPath).default
    if (typeof command !== 'function') {
      console.error('Invalid command', commandPath)
      commandMap.set(commandName, null)
    }
    commandMap.set(commandName, command)
    return
  } catch (e) {
    console.error('Error loading command', commandPath)
    console.error(e)
    console.trace()
    commandMap.set(commandName, null)
  }
}

/**
 * Loads a module from src/controllers
 */
export const getCommand = async (
  commandName: string
): Promise<null | ((req: Req) => Promise<Response | any>)> => {
  await warmupCommand(commandName)
  return commandMap.get(commandName) ?? null
}
