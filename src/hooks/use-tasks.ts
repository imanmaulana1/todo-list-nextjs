'use client';

import { TaskContext } from '@/contexts/task-context';
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export function useTasks({
  q = '',
  status = '',
}: {
  q?: string;
  status?: string;
}) {
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

export function useTasksContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
}
