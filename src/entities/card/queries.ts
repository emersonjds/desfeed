import { useQuery } from '@tanstack/react-query';

import { fetchJson } from '../../shared/api/client';
import { queueTodayResponseSchema } from './schema';

export const useTodayQueueQuery = () =>
  useQuery({
    queryKey: ['queue', 'today'],
    queryFn: () => fetchJson('/api/queue/today', queueTodayResponseSchema),
  });
