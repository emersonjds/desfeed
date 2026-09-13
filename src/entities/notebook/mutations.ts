import { useMutation } from '@tanstack/react-query';

import { fetchJson } from '../../shared/api/client';
import { ingestNotebookResponseSchema } from './schema';

type IngestNotebookInput = {
  notebookId: string;
  imageUri: string;
};

export const useIngestNotebookMutation = () =>
  useMutation({
    mutationFn: ({ notebookId, imageUri }: IngestNotebookInput) =>
      fetchJson(`/api/notebooks/${notebookId}/ingest`, ingestNotebookResponseSchema, {
        method: 'POST',
        body: JSON.stringify({ imageUri }),
      }),
  });
