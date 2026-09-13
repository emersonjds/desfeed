import { z } from 'zod';

export const optionIdSchema = z.enum(['A', 'B', 'C', 'D']);

export type OptionId = z.infer<typeof optionIdSchema>;

export const cardOptionSchema = z.object({
  id: optionIdSchema,
  label: z.string(),
});

export type CardOption = z.infer<typeof cardOptionSchema>;

export const fsrsStateSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);

export const cardFsrsSchema = z.object({
  due: z.iso.datetime(),
  stability: z.number(),
  difficulty: z.number(),
  elapsed_days: z.number(),
  scheduled_days: z.number(),
  learning_steps: z.number(),
  reps: z.number(),
  lapses: z.number(),
  state: fsrsStateSchema,
  last_review: z.iso.datetime().optional(),
});

export type CardFsrsData = z.infer<typeof cardFsrsSchema>;

export const cardSchema = z.object({
  id: z.string(),
  subject: z.string(),
  chapter: z.string(),
  reviewNumber: z.number().int().nonnegative(),
  imageUrl: z.string(),
  keyTerm: z.string(),
  question: z.string(),
  highlightTerm: z.string(),
  options: z.array(cardOptionSchema).length(4),
  correctOptionId: optionIdSchema,
  masteryPercent: z.number().min(0).max(100),
  bookmarkCount: z.number().int().nonnegative(),
  shareCount: z.number().int().nonnegative(),
  fsrs: cardFsrsSchema,
});

export type Card = z.infer<typeof cardSchema>;

export const queueTodayResponseSchema = z.object({
  cards: z.array(cardSchema),
});

export type QueueTodayResponse = z.infer<typeof queueTodayResponseSchema>;
