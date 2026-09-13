import { z } from 'zod';

export const subjectProgressSchema = z.object({
  subject: z.string(),
  retention: z.number().min(0).max(100),
  /** Variação em pontos percentuais contra o mês passado. */
  delta: z.number(),
  consolidated: z.number().int().nonnegative(),
  total: z.number().int().positive(),
});

export type SubjectProgress = z.infer<typeof subjectProgressSchema>;

export const conceptAtRiskSchema = z.object({
  concept: z.string(),
  subject: z.string(),
  daysUntilForgotten: z.number().int(),
});

export type ConceptAtRisk = z.infer<typeof conceptAtRiskSchema>;

export const progressResponseSchema = z.object({
  streakDays: z.number().int().nonnegative(),
  /** Dias de folga que não quebram a sequência — a sequência não pode virar coerção. */
  freezesLeft: z.number().int().nonnegative(),
  retentionD7: z.number().min(0).max(100),
  retentionD7LastMonth: z.number().min(0).max(100),
  consolidated: z.number().int().nonnegative(),
  totalConcepts: z.number().int().positive(),
  weekMinutes: z.array(z.object({ day: z.string(), minutes: z.number().int().nonnegative() })).length(7),
  subjects: z.array(subjectProgressSchema),
  atRisk: z.array(conceptAtRiskSchema),
  /** Meta coletiva da turma. Colaboração sem expor aluno contra aluno. */
  classGoal: z.object({
    className: z.string(),
    label: z.string(),
    done: z.number().int().nonnegative(),
    total: z.number().int().positive(),
  }),
});

export type ProgressResponse = z.infer<typeof progressResponseSchema>;
