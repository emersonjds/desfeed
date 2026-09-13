import { z } from 'zod'

export const notebookStatusSchema = z.enum(['revisao-hoje', 'estavel', 'reforco'])

export type NotebookStatus = z.infer<typeof notebookStatusSchema>

export const notebookSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  subject: z.string(),
  coverUrl: z.string().url(),
  status: notebookStatusSchema,
  cardCount: z.number().int().nonnegative(),
  retentionPercent: z.number().min(0).max(100),
  nextReviewLabel: z.string(),
  sourceLabel: z.string(),
})

export type NotebookSummary = z.infer<typeof notebookSummarySchema>

export const forgettingPeakSchema = z.object({
  id: z.string(),
  title: z.string(),
  whenLabel: z.string(),
  urgency: z.enum(['alta', 'media', 'baixa']),
  cardCount: z.number().int().positive(),
  detail: z.string(),
})

export type ForgettingPeak = z.infer<typeof forgettingPeakSchema>

export const notebookLibrarySchema = z.object({
  globalRetentionPercent: z.number().min(0).max(100),
  consolidatedConcepts: z.number().int().nonnegative(),
  totalConcepts: z.number().int().positive(),
  stabilityDays: z.number().nonnegative(),
  notebooks: z.array(notebookSummarySchema),
  peaks: z.array(forgettingPeakSchema),
})

export type NotebookLibrary = z.infer<typeof notebookLibrarySchema>
