import { http, HttpResponse } from 'msw';

import { cardSchema, type Card } from '../../../entities/card/schema';
import { submitReviewRequestSchema } from '../../../entities/review/schema';
import { API_BASE_URL } from '../config';
import { emptySession, mockCards, mockSession } from './data';

type MockScenario = 'happy' | 'empty' | 'error';

const readScenario = (): MockScenario => {
  const raw = process.env.EXPO_PUBLIC_MOCK_SCENARIO;
  return raw === 'empty' || raw === 'error' ? raw : 'happy';
};

const scannedCards: Card[] = [
  cardSchema.parse({
    id: 'card-scanned-carnot-rendimento',
    subject: 'Física II',
    chapter: 'Termodinâmica',
    reviewNumber: 0,
    imageUrl: 'https://picsum.photos/seed/scan-carnot/800/600',
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
];

export const handlers = [
  http.get(`${API_BASE_URL}/api/queue/today`, () => {
    const scenario = readScenario();

    if (scenario === 'error') {
      return HttpResponse.json({ message: 'Falha ao buscar a fila de hoje' }, { status: 500 });
    }

    if (scenario === 'empty') {
      return HttpResponse.json({ cards: [] });
    }

    return HttpResponse.json({ cards: mockCards });
  }),

  http.get(`${API_BASE_URL}/api/session/today`, () => {
    const scenario = readScenario();

    if (scenario === 'error') {
      return HttpResponse.json({ message: 'Falha ao buscar a sessão de hoje' }, { status: 500 });
    }

    if (scenario === 'empty') {
      return HttpResponse.json(emptySession);
    }

    return HttpResponse.json(mockSession);
  }),

  http.post(`${API_BASE_URL}/api/reviews`, async ({ request }: { request: Request }) => {
    const scenario = readScenario();

    if (scenario === 'error') {
      return HttpResponse.json({ message: 'Falha ao registrar a revisão' }, { status: 500 });
    }

    const body = submitReviewRequestSchema.parse(await request.json());
    const intervalDays: Record<typeof body.rating, number> = {
      again: 1 / 144,
      hard: 1,
      good: 3,
      easy: 7,
    };
    const nextDue = new Date(
      Date.parse(body.reviewedAt) + intervalDays[body.rating] * 24 * 60 * 60 * 1000,
    ).toISOString();

    return HttpResponse.json({ nextDue, xpGained: 30 });
  }),

  http.post(`${API_BASE_URL}/api/notebooks/:id/ingest`, () => {
    const scenario = readScenario();

    if (scenario === 'error') {
      return HttpResponse.json({ message: 'Falha ao processar o caderno' }, { status: 500 });
    }

    if (scenario === 'empty') {
      return HttpResponse.json({ cards: [], confidence: 'baixa' });
    }

    return HttpResponse.json({ cards: scannedCards, confidence: 'alta' });
  }),
];
