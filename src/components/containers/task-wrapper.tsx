
import LoadingTaskSpinner from '../fragments/loading-task-spinner';
import NoTaskMessage from '../fragments/no-task-message';

type Task = {
  id: number;
  taskName: string;
  isCompleted: boolean;
  updatedAt: Date;
};

interface TaskWrapperProps {
  tasks: Task[];
  total: number;
  isLoading: boolean;
}

export default function TaskWrapper({
  tasks,
  total,
  isLoading,
}: TaskWrapperProps) {
  console.log(total);
  console.log(tasks);
  return (
    <>
      {isLoading && <LoadingTaskSpinner />}
      {tasks && total > 0 ? <>Your tasks list goes here</> : <NoTaskMessage />}
    </>
  );
}
