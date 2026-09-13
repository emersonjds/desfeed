import { z } from 'zod';

import { cardSchema } from '../card/schema';

export const notebookConfidenceSchema = z.enum(['alta', 'media', 'baixa']);

export type NotebookConfidence = z.infer<typeof notebookConfidenceSchema>;

export const ingestNotebookResponseSchema = z.object({
  cards: z.array(cardSchema),
  confidence: notebookConfidenceSchema,
});

export type IngestNotebookResponse = z.infer<typeof ingestNotebookResponseSchema>;
