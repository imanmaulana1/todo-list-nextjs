'use client'

import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export function useTasks() {
  const searchParams = useSearchParams();

  const q = searchParams.get('q');
  const status = searchParams.get('status');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks', { q, status }],
    queryFn: async () => {
      const response = await api.get('/api/tasks', {
        params: {
          q: q || undefined,
          status: status || undefined,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, isError };
}
