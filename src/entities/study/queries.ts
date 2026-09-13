import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchJson } from '../../shared/api/client';
import {
  generateSessionResponseSchema,
  studyThemesResponseSchema,
  type GenerateSessionRequest,
} from './schema';

export const useStudyThemesQuery = () =>
  useQuery({
    queryKey: ['study', 'themes'],
    queryFn: () => fetchJson('/api/study/themes', studyThemesResponseSchema),
  });

export const useGenerateSessionMutation = () =>
  useMutation({
    mutationFn: (input: GenerateSessionRequest) =>
      fetchJson('/api/study/sessions', generateSessionResponseSchema, {
        method: 'POST',
        body: JSON.stringify(input),
      }),
  });
