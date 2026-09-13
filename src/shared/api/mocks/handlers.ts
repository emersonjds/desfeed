import { http, HttpResponse } from 'msw'

import { API_BASE_URL } from '../config'
import { resolveMockRoute } from './routes'

// Os handlers só traduzem a resolução compartilhada para o formato do MSW. A lógica de
// cenário e os dados moram em `routes.ts`, que o transporte nativo também usa.
const respond = (method: string, path: string, body?: unknown) => {
  const result = resolveMockRoute(method, path, body)
  if (!result) return HttpResponse.json({ message: 'Rota não mapeada' }, { status: 404 })
  return HttpResponse.json(result.body, { status: result.status })
}

export const handlers = [
  http.get(`${API_BASE_URL}/api/queue/today`, () => respond('GET', '/api/queue/today')),
  http.get(`${API_BASE_URL}/api/session/today`, () => respond('GET', '/api/session/today')),
  http.get(`${API_BASE_URL}/api/profile`, () => respond('GET', '/api/profile')),
  http.post(`${API_BASE_URL}/api/reviews`, async ({ request }: { request: Request }) =>
    respond('POST', '/api/reviews', await request.json()),
  ),
  http.post(`${API_BASE_URL}/api/notebooks/:id/ingest`, () =>
    respond('POST', '/api/notebooks/x/ingest'),
  ),
]
