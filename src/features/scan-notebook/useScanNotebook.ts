import { useState } from 'react';

import { ingestNotebookResponseSchema, type IngestNotebookResponse } from '../../entities/notebook/schema';
import { ApiError } from '../../shared/api/client';
import { API_BASE_URL } from '../../shared/api/config';

export type ScanStage = 'idle' | 'uploading' | 'reading' | 'generating' | 'done' | 'error';

type ScanNotebookState = {
  stage: ScanStage;
  result: IngestNotebookResponse | null;
  errorMessage: string | null;
};

const initialState: ScanNotebookState = { stage: 'idle', result: null, errorMessage: null };

export const useScanNotebook = () => {
  const [state, setState] = useState<ScanNotebookState>(initialState);

  const scan = async (notebookId: string, imageUri: string) => {
    setState({ stage: 'uploading', result: null, errorMessage: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/notebooks/${notebookId}/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUri }),
      });

      if (!response.ok) {
        throw new ApiError('Falha ao processar o caderno', response.status);
      }

      setState((current) => ({ ...current, stage: 'reading' }));
      const json = await response.json();

      setState((current) => ({ ...current, stage: 'generating' }));
      const parsed = ingestNotebookResponseSchema.parse(json);

      setState({ stage: 'done', result: parsed, errorMessage: null });
    } catch (error) {
      setState({
        stage: 'error',
        result: null,
        errorMessage: error instanceof Error ? error.message : 'Falha ao processar o caderno',
      });
    }
  };

  const reset = () => setState(initialState);

  return { ...state, scan, reset };
};
