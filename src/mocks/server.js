import { setupServer } from 'msw/lib/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)