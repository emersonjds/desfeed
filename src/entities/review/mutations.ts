import { useMutation } from '@tanstack/react-query';

import { fetchJson } from '../../shared/api/client';
import { submitReviewResponseSchema, type SubmitReviewRequest } from './schema';

export const useSubmitReviewMutation = () =>
  useMutation({
    mutationFn: (input: SubmitReviewRequest) =>
      fetchJson('/api/reviews', submitReviewResponseSchema, {
        method: 'POST',
        body: JSON.stringify(input),
      }),
  });
