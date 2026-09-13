import { create } from 'zustand';

import type { Card } from '../../entities/card/schema';
import { previewSelfEvalIntervals, type SelfEvalRating } from '../../entities/card/fsrs';
import { advanceSession, currentCard } from './session';

type DailySessionState = {
  queue: Card[];
  currentIndex: number;
  completed: number;
  goal: number;
  isFinished: boolean;
  isStarted: boolean;
  startedAt: Date | null;
  xpEarned: number;
  lastIntervalLabel: string | null;
  lastNextDue: Date | null;
  start: (queue: Card[], goal: number) => void;
  answer: (rating: SelfEvalRating, now?: Date) => void;
  goTo: (index: number) => void;
  addXp: (amount: number) => void;
  reset: () => void;
};

const initialState = {
  queue: [] as Card[],
  currentIndex: 0,
  completed: 0,
  goal: 0,
  isFinished: false,
  isStarted: false,
  startedAt: null as Date | null,
  xpEarned: 0,
  lastIntervalLabel: null,
  lastNextDue: null,
};

export const useDailySessionStore = create<DailySessionState>()((set, get) => ({
  ...initialState,

  start: (queue, goal) => {
    if (get().isStarted) {
      return;
    }
    set({ ...initialState, queue, goal, isStarted: true, startedAt: new Date() });
  },

  answer: (rating, now = new Date()) => {
    const state = get();
    const card = currentCard(state);
    const preview = card ? previewSelfEvalIntervals(card.fsrs, now)[rating] : null;
    const advanced = advanceSession(state, rating);

    set({
      ...advanced,
      lastIntervalLabel: preview?.intervalLabel ?? state.lastIntervalLabel,
      lastNextDue: preview?.nextDue ?? state.lastNextDue,
    });
  },

  // O feed é deslizável: quando o aluno arrasta, o índice visível precisa virar o índice
  // da sessão, senão a nota iria para o card errado.
  goTo: (index) => {
    const { queue, currentIndex } = get();
    if (index === currentIndex || index < 0 || index >= queue.length) {
      return;
    }
    set({ currentIndex: index });
  },

  addXp: (amount) => set((state) => ({ xpEarned: state.xpEarned + amount })),

  reset: () => set({ ...initialState }),
}));

export const currentSessionCard = (state: DailySessionState): Card | undefined => currentCard(state);
