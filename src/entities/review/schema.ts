import { z } from 'zod';

export const submitReviewRequestSchema = z.object({
  cardId: z.string(),
  rating: z.enum(['again', 'hard', 'good', 'easy']),
  reviewedAt: z.iso.datetime(),
});

export type SubmitReviewRequest = z.infer<typeof submitReviewRequestSchema>;

export const submitReviewResponseSchema = z.object({
  nextDue: z.iso.datetime(),
  xpGained: z.number().int().nonnegative(),
});

export type SubmitReviewResponse = z.infer<typeof submitReviewResponseSchema>;
