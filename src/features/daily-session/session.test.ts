import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { Card } from '../../entities/card/schema.ts';
import { advanceSession, currentCard, type SessionProgress } from './session.ts';

const buildCard = (id: string): Card => ({
  id,
  origin: { kind: 'proprio', theme: 'Teste' },
  subject: 'Bioquímica Médica',
  chapter: 'Cap. 4',
  reviewNumber: 1,
  imageUrl: 'https://example.com/image.png',
  keyTerm: 'Termo',
  question: 'Pergunta de teste?',
  highlightTerm: 'teste',
  options: [
    { id: 'A', label: 'A' },
    { id: 'B', label: 'B' },
    { id: 'C', label: 'C' },
    { id: 'D', label: 'D' },
  ],
  correctOptionId: 'A',
  masteryPercent: 50,
  bookmarkCount: 0,
  shareCount: 0,
  fsrs: {
    due: new Date().toISOString(),
    stability: 1,
    difficulty: 1,
    elapsed_days: 0,
    scheduled_days: 0,
    learning_steps: 0,
    reps: 0,
    lapses: 0,
    state: 0,
  },
});

const buildQueue = (count: number): Card[] =>
  Array.from({ length: count }, (_, index) => buildCard(`c${index + 1}`));

test('marca a sessão como encerrada ao bater a meta', () => {
  let progress: SessionProgress = { queue: buildQueue(3), currentIndex: 0, completed: 0, goal: 3 };

  for (let i = 0; i < 3; i += 1) {
    const result = advanceSession(progress, 'good');
    progress = { ...progress, ...result };
  }

  assert.equal(progress.completed, 3);
  assert.equal(currentCard(progress), undefined);
});

test('nao entrega mais nenhum card depois de encerrada — invariante de produto', () => {
  let progress: SessionProgress = { queue: buildQueue(3), currentIndex: 0, completed: 0, goal: 3 };

  for (let i = 0; i < 3; i += 1) {
    const result = advanceSession(progress, 'good');
    progress = { ...progress, ...result };
  }
  assert.equal(currentCard(progress), undefined);

  const extraAnswerAfterFinished = advanceSession(progress, 'good');
  assert.equal(extraAnswerAfterFinished.completed, progress.completed);
  assert.equal(currentCard({ ...progress, ...extraAnswerAfterFinished }), undefined);
});

test('devolve o card na mesma sessão quando o aluno errou', () => {
  const progress: SessionProgress = { queue: buildQueue(2), currentIndex: 0, completed: 0, goal: 2 };
  const result = advanceSession(progress, 'again');

  const occurrences = result.queue.filter((card) => card.id === 'c1');
  assert.equal(occurrences.length, 2);
  assert.equal(result.completed, 0);
  assert.equal(result.isFinished, false);
});
