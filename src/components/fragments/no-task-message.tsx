'use client';

import { useTasksContext } from '@/hooks/use-tasks';

export default function NoTaskMessage() {
  const { query } = useTasksContext();

  return (
    <section className='container max-w-screen-xl mx-auto my-8'>
      <div className='min-h-[30vh] flex justify-center items-center p-4 rounded-lg'>
        <h2 className='text-2xl'>
          {query ? (
            <>
              No task found for
              <span className='font-bold italic'> &quot;{query}&quot;</span>
            </>
          ) : (
            'You have no tasks! ✨'
          )}
        </h2>
      </div>
    </section>
  );
}
