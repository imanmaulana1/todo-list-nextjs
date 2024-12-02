'use client';

import { useState } from 'react';
import InputTask from '../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function FormTask() {
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();
  const { mutate: createTask } = useMutation({
    mutationFn: async (newTask: { taskName: string }) => {
      const response = await api.post('/api/tasks', newTask);
      return response.data;
    },
    onMutate: () => {
      toast.loading('Creating task...', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
      });
    },
    onSuccess: (data) => {
      console.log(data);
      setValue('');
      toast.dismiss();
      toast.success(data.message, {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.log(error);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      taskName: value,
    };
    createTask(payload);
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-screen-sm mx-auto mt-4'>
      <InputTask value={value} setValue={setValue} />
    </form>
  );
}
