import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchJson } from '../../shared/api/client';
import {
  classReportSchema,
  generateLessonResponseSchema,
  type GenerateLessonRequest,
} from './schema';

export const useClassReportQuery = () =>
  useQuery({
    queryKey: ['teacher', 'class'],
    queryFn: () => fetchJson('/api/teacher/class', classReportSchema),
  });

export const useGenerateLessonMutation = () =>
  useMutation({
    mutationFn: (input: GenerateLessonRequest) =>
      fetchJson('/api/teacher/lessons', generateLessonResponseSchema, {
        method: 'POST',
        body: JSON.stringify(input),
      }),
  });
