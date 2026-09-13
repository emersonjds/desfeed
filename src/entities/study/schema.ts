import { z } from 'zod';

import { cardSchema } from '../card/schema';

export const studyThemeSchema = z.object({
  id: z.string(),
  subject: z.string(),
  title: z.string(),
  /** Por que o Memfeed está sugerindo justo este tema agora. */
  reason: z.string(),
  cardCount: z.number().int().positive(),
});

export type StudyTheme = z.infer<typeof studyThemeSchema>;

export const studyThemesResponseSchema = z.object({
  suggested: z.array(studyThemeSchema),
  subjects: z.array(z.string()),
});

export type StudyThemesResponse = z.infer<typeof studyThemesResponseSchema>;

export const generateSessionRequestSchema = z.object({
  subject: z.string().min(1),
  theme: z.string().min(1),
  cardCount: z.number().int().min(5).max(30),
});

export type GenerateSessionRequest = z.infer<typeof generateSessionRequestSchema>;

export const generateSessionResponseSchema = z.object({
  theme: z.string(),
  cards: z.array(cardSchema),
});

export type GenerateSessionResponse = z.infer<typeof generateSessionResponseSchema>;
