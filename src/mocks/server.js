import { setupServer } from 'msw/lib/node'
import { commentHandlers } from './handlers/commentHandlers'

export const server = setupServer(...commentHandlers)