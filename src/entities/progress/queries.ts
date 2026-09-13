import { useQuery } from '@tanstack/react-query';

import { fetchJson } from '../../shared/api/client';
import { progressResponseSchema } from './schema';

export const useProgressQuery = () =>
  useQuery({
    queryKey: ['progress'],
    queryFn: () => fetchJson('/api/progress', progressResponseSchema),
  });
