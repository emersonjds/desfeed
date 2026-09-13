import { useQuery } from '@tanstack/react-query'

import { fetchJson } from '../../shared/api/client'
import { rankingSchema } from './schema'

export const useRankingQuery = () =>
  useQuery({
    queryKey: ['ranking'],
    queryFn: () => fetchJson('/api/ranking', rankingSchema),
  })
