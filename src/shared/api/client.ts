import type { z } from 'zod'

import { API_BASE_URL, STUDENT_ID } from './config'
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

// `__DEV__` é falso em build de produção, então uma demo publicada ficaria sem dado
// nenhum. `EXPO_PUBLIC_USE_MOCKS` é inlinado no bundle e decide nos dois sentidos: com
// `false` explícito o app fala com a API mesmo em desenvolvimento.
const mocksFlag = process.env.EXPO_PUBLIC_USE_MOCKS
const mocksEnabled = mocksFlag === 'false' ? false : mocksFlag === 'true' || __DEV__

// O transporte resolve pela mesma definição de rota que os handlers do MSW usam
// (`mocks/routes.ts`), em todas as plataformas. Interceptar a rede de verdade exigia
// polyfills nativos que quebram no build web, e o ganho de fidelidade não pagava isso.
const shouldUseDirectMock = mocksEnabled

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
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'x-student-id': STUDENT_ID,
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new ApiError(`Falha ao chamar ${path}`, response.status)
  }

  return schema.parse(await response.json())
}
