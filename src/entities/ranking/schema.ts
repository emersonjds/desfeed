import { z } from 'zod'

export const rankingTrendSchema = z.enum(['subindo', 'estavel', 'caindo'])

export type RankingTrend = z.infer<typeof rankingTrendSchema>

export const rankingEntrySchema = z.object({
  id: z.string(),
  position: z.number().int().positive(),
  name: z.string(),
  headline: z.string(),
  xp: z.number().int().nonnegative(),
  trend: rankingTrendSchema,
  isCurrentUser: z.boolean(),
})

export type RankingEntry = z.infer<typeof rankingEntrySchema>

export const rankingSchema = z.object({
  leagueName: z.string(),
  leagueRankLabel: z.string(),
  endsInLabel: z.string(),
  promotionCutoff: z.number().int().positive(),
  relegationCutoff: z.number().int().positive(),
  podium: z.array(rankingEntrySchema).length(3),
  entries: z.array(rankingEntrySchema),
  duel: z.object({
    title: z.string(),
    description: z.string(),
    rewardLabel: z.string(),
  }),
})

export type Ranking = z.infer<typeof rankingSchema>
