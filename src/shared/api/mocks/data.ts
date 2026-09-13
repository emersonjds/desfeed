import { cardSchema, type Card } from '../../../entities/card/schema';
import type { Profile } from '../../../entities/profile/schema';
import type { SessionToday } from '../../../entities/session/schema';

const now = () => new Date();

const daysAgo = (days: number): string => new Date(now().getTime() - days * 24 * 60 * 60 * 1000).toISOString();

const buildFsrs = (overrides: Partial<Card['fsrs']>): Card['fsrs'] => ({
  due: daysAgo(0),
  stability: 4.2,
  difficulty: 5.1,
  elapsed_days: 4,
  scheduled_days: 4,
  learning_steps: 0,
  reps: 3,
  lapses: 0,
  state: 2,
  last_review: daysAgo(4),
  ...overrides,
});

const rawCards: Card[] = [
  {
    id: 'card-atp-synthetase',
    subject: 'Bioquímica Médica',
    chapter: 'Cap. 4',
    reviewNumber: 3,
    imageUrl: 'https://picsum.photos/seed/mitochondria/800/600',
    keyTerm: 'ATP Synthetase',
    question:
      'Qual organela realiza a fosforilação oxidativa gerando a maior fração de ATP durante a respiração celular?',
    highlightTerm: 'fosforilação oxidativa',
    options: [
      { id: 'A', label: 'Mitocôndria' },
      { id: 'B', label: 'Complexo de Golgi' },
      { id: 'C', label: 'Retículo Endoplasmático Liso' },
      { id: 'D', label: 'Peroxissomo' },
    ],
    correctOptionId: 'A',
    masteryPercent: 92,
    bookmarkCount: 1800,
    shareCount: 420,
    fsrs: buildFsrs({ scheduled_days: 4 }),
  },
  {
    id: 'card-carnot',
    subject: 'Física II',
    chapter: 'Termodinâmica',
    reviewNumber: 1,
    imageUrl: 'https://picsum.photos/seed/carnot/800/600',
    keyTerm: 'Ciclo de Carnot',
    question: 'Qual é o rendimento máximo teórico de uma máquina térmica operando entre duas fontes de calor?',
    highlightTerm: 'rendimento máximo teórico',
    options: [
      { id: 'A', label: 'η = 1 - T₂/T₁' },
      { id: 'B', label: 'η = T₁/T₂' },
      { id: 'C', label: 'η = Q₁ - Q₂' },
      { id: 'D', label: 'η = 100%' },
    ],
    correctOptionId: 'A',
    masteryPercent: 78,
    bookmarkCount: 640,
    shareCount: 110,
    fsrs: buildFsrs({ scheduled_days: 1, reps: 1, state: 1 }),
  },
  {
    id: 'card-entropia',
    subject: 'Física II',
    chapter: 'Termodinâmica',
    reviewNumber: 2,
    imageUrl: 'https://picsum.photos/seed/entropia/800/600',
    keyTerm: 'Entropia',
    question: 'Em um sistema isolado, o que acontece com a entropia durante um processo espontâneo?',
    highlightTerm: 'processo espontâneo',
    options: [
      { id: 'A', label: 'Sempre aumenta ou permanece constante' },
      { id: 'B', label: 'Sempre diminui' },
      { id: 'C', label: 'Permanece sempre constante' },
      { id: 'D', label: 'Torna-se negativa' },
    ],
    correctOptionId: 'A',
    masteryPercent: 65,
    bookmarkCount: 300,
    shareCount: 54,
    fsrs: buildFsrs({ scheduled_days: 2, reps: 2 }),
  },
];

export const mockCards: Card[] = rawCards.map((card) => cardSchema.parse(card));

export const mockSession: SessionToday = {
  completed: 14,
  goal: 20,
  streak: 14,
  xp: 820,
};

export const emptySession: SessionToday = {
  completed: 20,
  goal: 20,
  streak: 14,
  xp: 820,
};

export const mockProfile: Profile = {
  name: 'Lucas Rocha',
  handle: '@lucas.med',
  headline: 'Estudante de Medicina · UFRJ · 4º período',
  levelLabel: 'Nível 18 · Neurônio Mestre',
  leagueLabel: 'Liga Diamante',
  retentionPercent: 93.8,
  retentionTarget: 90,
  stabilizedFacts: 482,
  cardsReviewed: 1064,
  activeDaysLast30: 26,
  dailyGoal: 20,
  reminderTime: '09:30',
  badges: [
    {
      id: 'badge-cacador-de-sinapses',
      title: 'Caçador de sinapses',
      description: 'Mais de 1.000 cards reativados com sucesso',
      tier: 'ouro',
    },
    {
      id: 'badge-foco-inabalavel',
      title: 'Foco inabalável',
      description: '14 sessões seguidas sem sair do app no meio',
      tier: 'prata',
    },
    {
      id: 'badge-muralha-de-ebbinghaus',
      title: 'Muralha de Ebbinghaus',
      description: 'Nenhum esquecimento em revisão agendada',
      tier: 'bronze',
    },
  ],
};
