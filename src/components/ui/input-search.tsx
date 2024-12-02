'use client';

import { useTasksContext } from '@/hooks/use-tasks';
import { Input } from '@nextui-org/input';
import { Search } from 'lucide-react';

export default function InputSearch() {
  const { query, setQuery } = useTasksContext();
  return (
    <Input
      type='text'
      name='q'
      placeholder='Search...'
      endContent={<Search size={16} color='#333' />}
      variant='bordered'
      size='md'
      classNames={{
        input: ['bg-white', 'text-gray-900', 'placeholder:text-gray-500'],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          'shadow',
          'bg-[#ffffff]',
          'hover:bg-[#fff]',
          'cursor-text',
          'group-data-[focus=true]:border-gray-400',
          'group-data-[hover=true]:border-gray-400',
        ],
      }}
      value={query}
      onValueChange={setQuery}
    />
  );
}
