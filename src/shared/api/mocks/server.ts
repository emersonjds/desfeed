import './hermes-polyfills'

import { setupServer } from 'msw/native'

import { handlers } from './handlers'

export const startMockServer = (): void => {
  if (!__DEV__) return

  const server = setupServer(...handlers)
  server.listen({ onUnhandledRequest: 'bypass' })
}
