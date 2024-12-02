import { formatDate } from '@/utils/helper';
import { Card, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Check, Edit2, Trash2 } from 'lucide-react';

type Task = {
  id: number;
  taskName: string;
  isCompleted: boolean;
  updatedAt: Date;
};

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className='flex flex-row'>
      <CardHeader className='p-3 flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <Button
            radius='full'
            isIconOnly
            color='default'
            variant='faded'
            aria-label='Edit task'
            size='sm'
            className={`${
              task.isCompleted ? 'bg-[#577ab2]' : 'bg-transparent'
            }`}
          >
            {task.isCompleted ? <Check size={16} color='#fff' /> : null}
          </Button>
          <div>
            <h3 className={`${task.isCompleted ? 'line-through text-gray-500' : ''} text-gray-900`}>{task.taskName}</h3>
            <p className='text-gray-600 text-sm'>
              {formatDate(task.updatedAt, 'h:mm A, DD/MM/YYYY')}
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button
            isIconOnly
            color='default'
            variant='faded'
            aria-label='Edit task'
            size='sm'
          >
            <Edit2 size={16} color='#333' />
          </Button>
          <Button
            isIconOnly
            color='danger'
            variant='faded'
            aria-label='Delete task'
            size='sm'
          >
            <Trash2 size={16} color='#333' />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
