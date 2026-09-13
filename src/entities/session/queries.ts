import { useQuery } from '@tanstack/react-query';

import { fetchJson } from '../../shared/api/client';
import { sessionTodaySchema } from './schema';

export const useSessionTodayQuery = () =>
  useQuery({
    queryKey: ['session', 'today'],
    queryFn: () => fetchJson('/api/session/today', sessionTodaySchema),
  });
