import { z } from 'zod';

export const badgeTierSchema = z.enum(['ouro', 'prata', 'bronze']);

export type BadgeTier = z.infer<typeof badgeTierSchema>;

export const badgeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tier: badgeTierSchema,
});

export type Badge = z.infer<typeof badgeSchema>;

export const profileSchema = z.object({
  name: z.string(),
  handle: z.string(),
  headline: z.string(),
  levelLabel: z.string(),
  leagueLabel: z.string(),
  retentionPercent: z.number().min(0).max(100),
  retentionTarget: z.number().min(0).max(100),
  stabilizedFacts: z.number().int().nonnegative(),
  cardsReviewed: z.number().int().nonnegative(),
  activeDaysLast30: z.number().int().min(0).max(30),
  dailyGoal: z.number().int().positive(),
  reminderTime: z.string().regex(/^\d{2}:\d{2}$/),
  badges: z.array(badgeSchema),
});

export type Profile = z.infer<typeof profileSchema>;
