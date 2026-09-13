import { Platform } from 'react-native'
import type { z } from 'zod'

import { API_BASE_URL } from './config'
import { resolveMockRoute } from './mocks/routes'

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Latência simulada: sem ela os estados de carregamento nunca aparecem e a tela parece
// pronta antes de existir. Com ela, o app se comporta como se já houvesse uma API.
const MOCK_LATENCY_MS = 280

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

// No web o MSW intercepta a rede de verdade e é o caminho mais fiel. No nativo a
// interceptação depende de `Response` com corpo em stream, que o Hermes não entrega — o
// corpo chegava vazio. Aqui o transporte resolve pela MESMA definição de rota que os
// handlers do MSW usam, então web e celular nunca respondem coisas diferentes.
const shouldUseDirectMock = __DEV__ && Platform.OS !== 'web'

export const fetchJson = async <Schema extends z.ZodType>(
  path: string,
  schema: Schema,
  init?: RequestInit,
): Promise<z.infer<Schema>> => {
  if (shouldUseDirectMock) {
    const method = init?.method ?? 'GET'
    const parsedBody = typeof init?.body === 'string' ? JSON.parse(init.body) : undefined
    const mocked = resolveMockRoute(method, path, parsedBody)

    if (mocked) {
      await delay(MOCK_LATENCY_MS)

      if (mocked.status >= 400) {
        throw new ApiError(`Falha ao chamar ${path}`, mocked.status)
      }

      return schema.parse(mocked.body)
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })

  if (!response.ok) {
    throw new ApiError(`Falha ao chamar ${path}`, response.status)
  }

  return schema.parse(await response.json())
}
