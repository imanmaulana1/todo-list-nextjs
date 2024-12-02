import { Spinner, useDisclosure } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Select, SelectItem } from '@nextui-org/select';
import { Input } from '@nextui-org/input';
import { Edit2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
interface ModalEditProps {
  id: number;
}

export default function ModalEdit({ id }: ModalEditProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: task,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      const response = await api.get(`/api/tasks/${id}`);
      return response.data;
    },
    enabled: shouldFetch,
    staleTime: 5 * 60 * 1000,
  });

  const { mutate: updateTask } = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: { taskName: string; status: boolean };
    }) => {
      const response = await api.put(`/api/tasks/${id}`, payload);
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

  const handleOpen = () => {
    setShouldFetch(true);
    onOpen();
  };

  const handleSubmit = () => {
    updateTask({ id, payload: { taskName: value, status } });
    onOpenChange();
  };

  useEffect(() => {
    if (task) {
      setValue(task.data.taskName);
      setStatus(task.data.isCompleted);
    }
  }, [task]);

  const options = [
    { key: 'true', label: 'Completed' },
    { key: 'false', label: 'In Progress' },
  ];

  return (
    <>
      <Button
        isIconOnly
        color='default'
        variant='faded'
        aria-label='Edit task'
        size='sm'
        onPress={handleOpen}
      >
        <Edit2 size={16} color='#333' />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Edit Task
              </ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <Spinner size='lg' />
                ) : isError ? (
                  <p>Error fetching task data. Please try again.</p>
                ) : (
                  <>
                    <Input
                      autoFocus
                      label='Task Name'
                      placeholder='Enter task name'
                      variant='bordered'
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <Select
                      label='Filter by Status'
                      size='sm'
                      selectedKeys={new Set([status.toString()])}
                      onSelectionChange={(selected) => {
                        const selectedKey = Array.from(selected)[0] as string;
                        setStatus(selectedKey === 'true');
                      }}
                      classNames={{
                        trigger:
                          'w-full md:w-[180px] lg:w-[200px] bg-[#ffffff]',
                        listboxWrapper: 'w-full md:w-[180px] lg:w-[200px]',
                      }}
                    >
                      {options.map((item) => (
                        <SelectItem key={item.key} value={item.key}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={handleSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
