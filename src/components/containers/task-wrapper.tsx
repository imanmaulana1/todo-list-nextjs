import LoadingTaskSpinner from '../fragments/loading-task-spinner';
import NoTaskMessage from '../fragments/no-task-message';
import TaskCard from '../fragments/task-card';

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
  return (
    <>
      {isLoading && <LoadingTaskSpinner />}
      {!isLoading && total === 0 && <NoTaskMessage />}
      {!isLoading && tasks && total > 0 && (
        <>
          <section className='container max-w-screen-xl mx-auto my-8'>
            <div className='min-h-[30vh] bg-[#d7d7d7] flex flex-col gap-4 p-4 rounded-lg'>
              {tasks?.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
