import { useDisclosure } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { toast } from 'react-toastify';
import axios from 'axios';

interface ModalDeleteProps {
  id: number;
}

export default function ModalDelete({ id }: ModalDeleteProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();
  const { mutate: deleteTask } = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/api/tasks/${id}`);
      return response.data;
    },
    onMutate: () => {
      toast.loading('Deleting task...', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
      });
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.message, {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
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

  const onDelete = () => {
    deleteTask(id);
  };

  return (
    <>
      <Button
        isIconOnly
        color='default'
        variant='faded'
        aria-label='Delete task'
        size='sm'
        onPress={onOpen}
      >
        <Trash2 size={16} color='#333' />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Delete Task
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this task? This action cannot
                  be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
