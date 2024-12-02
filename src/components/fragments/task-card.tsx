import { formatDate } from '@/utils/helper';
import { Card, CardHeader } from '@nextui-org/card';
import ButtonUpdateStatus from '../ui/button-update-status';
import ModalDelete from './modal-delete';
import ModalEdit from './modal-edit';

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
          <ButtonUpdateStatus isCompleted={task.isCompleted} id={task.id} />
          <div>
            <h3
              className={`${
                task.isCompleted
                  ? 'line-through text-gray-500'
                  : 'text-gray-900'
              }`}
            >
              {task.taskName}
            </h3>
            <p className='text-gray-600 text-sm'>
              {formatDate(task.updatedAt, 'h:mm A, DD/MM/YYYY')}
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <ModalEdit id={task.id}/>
          <ModalDelete id={task.id} />
        </div>
      </CardHeader>
    </Card>
  );
}
