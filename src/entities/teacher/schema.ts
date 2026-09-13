import { z } from 'zod';

export const draftQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  correctAnswer: z.string(),
  approved: z.boolean(),
});

export type DraftQuestion = z.infer<typeof draftQuestionSchema>;

export const generateLessonRequestSchema = z.object({
  subject: z.string().min(1),
  topic: z.string().min(1),
  questionCount: z.number().int().min(5).max(30),
});

export type GenerateLessonRequest = z.infer<typeof generateLessonRequestSchema>;

export const generateLessonResponseSchema = z.object({
  lessonId: z.string(),
  topic: z.string(),
  questions: z.array(draftQuestionSchema),
});

export type GenerateLessonResponse = z.infer<typeof generateLessonResponseSchema>;

export const conceptResultSchema = z.object({
  concept: z.string(),
  /** Acerto no dia da aula. */
  accuracyOnDay: z.number().min(0).max(100),
  /** O que sobrou uma semana depois — a métrica que só existe aqui. */
  retentionD7: z.number().min(0).max(100),
});

export type ConceptResult = z.infer<typeof conceptResultSchema>;

export const publishedLessonSchema = z.object({
  id: z.string(),
  topic: z.string(),
  publishedAt: z.iso.datetime(),
  answeredBy: z.number().int().nonnegative(),
  concepts: z.array(conceptResultSchema),
});

export type PublishedLesson = z.infer<typeof publishedLessonSchema>;

export const classReportSchema = z.object({
  className: z.string(),
  subject: z.string(),
  studentCount: z.number().int().positive(),
  participation: z.number().min(0).max(100),
  retentionD7: z.number().min(0).max(100),
  retentionD30: z.number().min(0).max(100),
  lessons: z.array(publishedLessonSchema),
});

export type ClassReport = z.infer<typeof classReportSchema>;
