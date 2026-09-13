import { setupServer } from 'msw/native';

import { handlers } from './handlers';

if (__DEV__) {
  const server = setupServer(...handlers);
  server.listen({ onUnhandledRequest: 'bypass' });
}
