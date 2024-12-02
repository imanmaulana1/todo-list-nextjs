'use client';

import { useDebounce } from 'use-debounce';
import FilterTask from '@/components/containers/filter-task';
import FormTask from '@/components/containers/form-task';
import Header from '@/components/containers/header';
import { useTasks, useTasksContext } from '@/hooks/use-tasks';
export default function Home() {
  const { query, status } = useTasksContext();
  const [value] = useDebounce(query, 500);

  const { data } = useTasks({ q: value, status: status || '' });

  console.log(data);
  return (
    <>
      <Header />
      <main>
        <FormTask />
        <FilterTask />
      </main>
    </>
  );
}
