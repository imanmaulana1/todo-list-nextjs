'use client';

import { useDebounce } from 'use-debounce';
import FilterTask from '@/components/containers/filter-task';
import FormTask from '@/components/containers/form-task';
import Header from '@/components/containers/header';
import { useTasks, useTasksContext } from '@/hooks/use-tasks';
import TaskWrapper from '@/components/containers/task-wrapper';
export default function Home() {
  const { query, status } = useTasksContext();
  const [value] = useDebounce(query, 500);

  const { data: tasks, isLoading } = useTasks({
    q: value,
    status: status || '',
  });

  return (
    <>
      <Header />
      <main>
        <FormTask />
        <FilterTask />
        <TaskWrapper
          tasks={tasks?.data}
          total={tasks?.total}
          isLoading={isLoading}
        />
      </main>
    </>
  );
}
