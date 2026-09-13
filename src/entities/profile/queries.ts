import { useQuery } from '@tanstack/react-query';

import { fetchJson } from '../../shared/api/client';
import { profileSchema } from './schema';

export const useProfileQuery = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchJson('/api/profile', profileSchema),
  });
