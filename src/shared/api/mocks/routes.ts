import { generateSessionRequestSchema } from '../../../entities/study/schema'
import { submitReviewRequestSchema } from '../../../entities/review/schema'
import { generateLessonRequestSchema } from '../../../entities/teacher/schema'
import { emptySession, mockCards, mockNotebookLibrary, mockProfile, mockSession } from './data'
import { emptyProgress, mockProgress } from './progress'
import { generateCardsForTheme, mockStudyThemes } from './study'
import { generateLesson, mockClassReport } from './teacher'

export type MockScenario = 'happy' | 'empty' | 'error'

export const readScenario = (): MockScenario => {
  const raw = process.env.EXPO_PUBLIC_MOCK_SCENARIO
  return raw === 'empty' || raw === 'error' ? raw : 'happy'
}

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

  if (verb === 'GET' && path === '/api/notebooks') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao buscar seus cadernos' } }
    if (scenario === 'empty') {
      return { status: 200, body: { ...mockNotebookLibrary, notebooks: [], peaks: [] } }
    }
    return { status: 200, body: mockNotebookLibrary }
  }

  if (verb === 'GET' && path === '/api/progress') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao buscar sua evolução' } }
    return { status: 200, body: scenario === 'empty' ? emptyProgress : mockProgress }
  }

  if (verb === 'GET' && path === '/api/study/themes') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao buscar os temas' } }
    if (scenario === 'empty') return { status: 200, body: { ...mockStudyThemes, suggested: [] } }
    return { status: 200, body: mockStudyThemes }
  }

  if (verb === 'POST' && path === '/api/study/sessions') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao gerar as perguntas' } }
    const input = generateSessionRequestSchema.parse(body)
    return {
      status: 200,
      body: {
        theme: input.theme,
        cards: generateCardsForTheme(input.subject, input.theme, input.cardCount),
      },
    }
  }

  if (verb === 'GET' && path === '/api/teacher/class') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao buscar a turma' } }
    return { status: 200, body: mockClassReport }
  }

  if (verb === 'POST' && path === '/api/teacher/lessons') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao gerar a aula' } }
    const input = generateLessonRequestSchema.parse(body)
    return { status: 200, body: generateLesson(input.topic, input.questionCount) }
  }

  if (verb === 'POST' && path === '/api/reviews') {
    if (scenario === 'error') return { status: 500, body: { message: 'Falha ao registrar a revisão' } }
    return reviewResponse(body)
  }


  return null
}
