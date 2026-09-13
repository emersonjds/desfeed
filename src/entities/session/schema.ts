import { z } from 'zod';

export const sessionTodaySchema = z.object({
  completed: z.number().int().nonnegative(),
  goal: z.number().int().positive(),
  streak: z.number().int().nonnegative(),
  xp: z.number().int().nonnegative(),
});

export type SessionToday = z.infer<typeof sessionTodaySchema>;

export const isSessionComplete = (session: Pick<SessionToday, 'completed' | 'goal'>): boolean =>
  session.completed >= session.goal;
