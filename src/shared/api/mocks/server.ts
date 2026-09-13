import './hermes-polyfills'

import { setupServer } from 'msw/native'

import { handlers } from './handlers'

if (__DEV__) {
  setupServer(...handlers).listen({ onUnhandledRequest: 'bypass' })
}
