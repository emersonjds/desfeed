import { progressResponseSchema } from '../../../entities/progress/schema'

export const mockProgress = progressResponseSchema.parse({
  streakDays: 14,
  freezesLeft: 2,
  retentionD7: 78,
  retentionD7LastMonth: 61,
  consolidated: 168,
  totalConcepts: 182,
  weekMinutes: [
    { day: 'S', minutes: 8 },
    { day: 'T', minutes: 12 },
    { day: 'Q', minutes: 6 },
    { day: 'Q', minutes: 14 },
    { day: 'S', minutes: 9 },
    { day: 'S', minutes: 0 },
    { day: 'D', minutes: 11 },
  ],
  subjects: [
    { subject: 'Biologia', retention: 86, delta: 9, consolidated: 54, total: 58 },
    { subject: 'Física II', retention: 71, delta: 14, consolidated: 38, total: 52 },
    { subject: 'Cálculo I', retention: 64, delta: -3, consolidated: 29, total: 44 },
    { subject: 'Direito Constitucional', retention: 81, delta: 6, consolidated: 47, total: 58 },
  ],
  atRisk: [
    { concept: 'Ciclo de Krebs', subject: 'Biologia', daysUntilForgotten: 1 },
    { concept: 'Regra do quociente', subject: 'Cálculo I', daysUntilForgotten: 2 },
    { concept: 'Entropia em processos irreversíveis', subject: 'Física II', daysUntilForgotten: 3 },
  ],
  classGoal: {
    className: '2º ano B',
    label: 'Conceitos consolidados pela turma nesta semana',
    done: 412,
    total: 600,
  },
})

export const emptyProgress = progressResponseSchema.parse({
  ...mockProgress,
  streakDays: 0,
  consolidated: 0,
  subjects: [],
  atRisk: [],
})
