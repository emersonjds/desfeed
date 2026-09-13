import { cardSchema, type Card } from '../../../entities/card/schema';
import type { Profile } from '../../../entities/profile/schema';
import type { SessionToday } from '../../../entities/session/schema';
import { notebookLibrarySchema, type NotebookLibrary } from '../../../entities/notebook/library-schema'

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
    origin: { kind: 'turma', teacher: 'Prof. Marcos', lesson: 'Respiração celular' },
    subject: 'Bioquímica Médica',
    chapter: 'Cap. 4',
    reviewNumber: 3,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Atp_synthase_pt.png/960px-Atp_synthase_pt.png',
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
    origin: { kind: 'turma', teacher: 'Profa. Helena', lesson: 'Máquinas térmicas' },
    subject: 'Física II',
    chapter: 'Termodinâmica',
    reviewNumber: 1,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Carnot-cycle-p-V-diagram.svg/langpt-960px-Carnot-cycle-p-V-diagram.svg.png',
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
    origin: { kind: 'proprio', theme: 'Entropia para a prova de sexta' },
    subject: 'Física II',
    chapter: 'Termodinâmica',
    reviewNumber: 2,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Carnot_Cycle_T-S_diagram.svg/960px-Carnot_Cycle_T-S_diagram.svg.png',
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

export const mockNotebookLibrary: NotebookLibrary = notebookLibrarySchema.parse({
  globalRetentionPercent: 92,
  consolidatedConcepts: 168,
  totalConcepts: 182,
  stabilityDays: 24.8,
  notebooks: [
    {
      id: 'nb-biologia-celular',
      title: 'Biologia Celular',
      subject: 'Bioquímica Médica',
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Protein_folding_figure.png/960px-Protein_folding_figure.png',
      status: 'revisao-hoje',
      cardCount: 48,
      retentionPercent: 96,
      nextReviewLabel: 'Revisão hoje',
      sourceLabel: 'Escaneado há 2 dias',
    },
    {
      id: 'nb-direito-constitucional',
      title: 'Direito Constitucional',
      subject: 'Direitos Fundamentais',
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Declaration_of_the_Rights_of_Man_and_of_the_Citizen_in_1789.jpg/960px-Declaration_of_the_Rights_of_Man_and_of_the_Citizen_in_1789.jpg',
      status: 'estavel',
      cardCount: 72,
      retentionPercent: 91,
      nextReviewLabel: 'Próxima em 3 dias',
      sourceLabel: 'Apostila em PDF condensada',
    },
    {
      id: 'nb-calculo-derivadas',
      title: 'Cálculo I — Derivadas',
      subject: 'Regra da cadeia e quociente',
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Newton_iteration.png/960px-Newton_iteration.png',
      status: 'reforco',
      cardCount: 30,
      retentionPercent: 68,
      nextReviewLabel: 'Decaimento em 48h',
      sourceLabel: 'Foto de quadro-negro',
    },
    {
      id: 'nb-termodinamica',
      title: 'Física II — Termodinâmica',
      subject: 'Ciclo de Carnot e entropia',
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Carnot_heat_engine_2.svg/langpt-960px-Carnot_heat_engine_2.svg.png',
      status: 'estavel',
      cardCount: 41,
      retentionPercent: 89,
      nextReviewLabel: 'Próxima em 5 dias',
      sourceLabel: 'Caderno fotografado',
    },
  ],
  peaks: [
    {
      id: 'peak-krebs',
      title: 'Ciclo de Krebs e fosforilação',
      whenLabel: 'Hoje às 19:30',
      urgency: 'alta',
      cardCount: 12,
      detail: 'A retenção cai para 68% se você adiar.',
    },
    {
      id: 'peak-cadeia',
      title: 'Regra da cadeia e quociente',
      whenLabel: 'Amanhã de manhã',
      urgency: 'media',
      cardCount: 8,
      detail: 'Sessão rápida sugerida: 4 minutos.',
    },
    {
      id: 'peak-direitos',
      title: 'Direitos fundamentais — Art. 5º',
      whenLabel: 'Em 3 dias',
      urgency: 'baixa',
      cardCount: 15,
      detail: 'Traço de memória sólido, 94% de recordação prevista.',
    },
  ],
})

