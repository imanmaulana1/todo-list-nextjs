import { api } from '@/lib/axios';
import { Button } from '@nextui-org/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CheckCheck } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ButtonMarkAllCompleted() {
  const queryClient = useQueryClient();
  const { mutate: markAllCompleted, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api.patch('/api/tasks');
      return response.data;
    },
    onMutate: () => {
      toast.loading('Marking all tasks as completed...', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
      });
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (data.message === '🔥 You did it! No more tasks to tackle today!') {
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 3000,
          theme: 'light',
        });

        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      } else {
        toast.info(data.message, {
          position: 'top-center',
          autoClose: 3000,
          theme: 'light',
        });
      }
    },
    onError: (error) => {
      toast.dismiss();
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || '😞 An unknown error occurred';

        toast.dismiss();
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 3000,
          theme: 'light',
        });
      } else {
        toast.dismiss();
        toast.error('😞 Oops something went wrong', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'light',
        });
      }
    },
  });

  const handleClickMarkAllCompleted = () => {
    markAllCompleted();
  };
  return (
    <div className='flex gap-4 items-center'>
      <Button
        isLoading={isPending}
        color='primary'
        className='bg-[#577ab2]'
        endContent={<CheckCheck size={16} />}
        onClick={handleClickMarkAllCompleted}
      >
        {isPending ? 'Loading' : 'Mark All Completed'}
      </Button>
    </div>
  );
}
