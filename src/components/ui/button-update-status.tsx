'use client';

import { api } from '@/lib/axios';
import { Button } from '@nextui-org/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';

interface ButtonUpdateStatusProps {
  isCompleted: boolean;
  id: number;
}

export default function ButtonUpdateStatus({
  isCompleted,
  id,
}: ButtonUpdateStatusProps) {
  const queryClient = useQueryClient();
  const { mutate: updateStatus } = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.patch(`/api/tasks/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error((error as Error).message);
    },
  });
  const handleClick = (id: number) => {
    updateStatus(id);
  };
  return (
    <Button
      radius='full'
      isIconOnly
      color='default'
      variant='faded'
      aria-label='Edit task'
      size='sm'
      className={`${isCompleted ? 'bg-[#577ab2]' : 'bg-transparent'}`}
      onClick={() => handleClick(id)}
    >
      {isCompleted ? <Check size={16} color='#fff' /> : null}
    </Button>
  );
}
