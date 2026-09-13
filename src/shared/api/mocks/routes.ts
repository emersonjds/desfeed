import { cardSchema, type Card } from '../../../entities/card/schema'
import { submitReviewRequestSchema } from '../../../entities/review/schema'
import { emptySession, mockCards, mockProfile, mockSession } from './data'

export type MockScenario = 'happy' | 'empty' | 'error'

export const readScenario = (): MockScenario => {
  const raw = process.env.EXPO_PUBLIC_MOCK_SCENARIO
  return raw === 'empty' || raw === 'error' ? raw : 'happy'
}

export const scannedCards: Card[] = [
  cardSchema.parse({
    id: 'card-scanned-carnot-rendimento',
    subject: 'Física II',
    chapter: 'Termodinâmica',
    reviewNumber: 0,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=70',
    keyTerm: 'Ciclo de Carnot',
    question: 'Qual o rendimento máximo teórico de uma máquina de Carnot?',
    highlightTerm: 'rendimento máximo teórico',
    options: [
      { id: 'A', label: 'η = 1 - T₂/T₁' },
      { id: 'B', label: 'η = T₁ + T₂' },
      { id: 'C', label: 'η = Q₁ / Q₂' },
      { id: 'D', label: 'η = 0' },
    ],
    correctOptionId: 'A',
    masteryPercent: 0,
    bookmarkCount: 0,
    shareCount: 0,
    fsrs: {
      due: new Date().toISOString(),
      stability: 0,
      difficulty: 0,
      elapsed_days: 0,
      scheduled_days: 0,
      learning_steps: 0,
      reps: 0,
      lapses: 0,
      state: 0,
    },
  }),
]

export type MockJsonBody = Record<string, unknown> | unknown[]

export type MockResult = { status: number; body: MockJsonBody }

const intervalDaysByRating = {
  again: 1 / 144,
  hard: 1,
  good: 3,
  easy: 7,
} as const

const reviewResponse = (rawBody: unknown): MockResult => {
  const body = submitReviewRequestSchema.parse(rawBody)
  const nextDue = new Date(
    Date.parse(body.reviewedAt) + intervalDaysByRating[body.rating] * 24 * 60 * 60 * 1000,
  ).toISOString()

  return { status: 200, body: { nextDue, xpGained: 30 } }
}

// Única fonte de verdade das respostas simuladas. Os handlers do MSW (web) e o transporte
// direto (nativo) chamam esta função — assim não existe risco de o web e o celular
// responderem coisas diferentes.
export const resolveMockRoute = (
  method: string,
  path: string,
  body?: unknown,
): MockResult | null => {
  const scenario = readScenario()
  const verb = method.toUpperCase()

  if (verb === 'GET' && path === '/api/queue/today') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao buscar a fila de hoje' } }
    return { status: 200, body: { cards: scenario === 'empty' ? [] : mockCards } }
  }

  if (verb === 'GET' && path === '/api/session/today') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao buscar a sessão de hoje' } }
    return { status: 200, body: scenario === 'empty' ? emptySession : mockSession }
  }

  if (verb === 'GET' && path === '/api/profile') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao buscar o perfil' } }
    return { status: 200, body: mockProfile }
  }

  if (verb === 'POST' && path === '/api/reviews') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao registrar a revisão' } }
    return reviewResponse(body)
  }

  if (verb === 'POST' && /^\/api\/notebooks\/[^/]+\/ingest$/.test(path)) {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao processar o caderno' } }
    if (scenario === 'empty') return { status: 200, body: { cards: [], confidence: 'baixa' } }
    return { status: 200, body: { cards: scannedCards, confidence: 'alta' } }
  }

  return null
}
