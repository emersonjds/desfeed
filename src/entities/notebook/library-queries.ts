import { useQuery } from '@tanstack/react-query'

import { fetchJson } from '../../shared/api/client'
import { notebookLibrarySchema } from './library-schema'

export const useNotebookLibraryQuery = () =>
  useQuery({
    queryKey: ['notebooks'],
    queryFn: () => fetchJson('/api/notebooks', notebookLibrarySchema),
  })
