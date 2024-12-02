'use client';

import { useTasksContext } from '@/hooks/use-tasks';
import { Select, SelectItem } from '@nextui-org/select';

export default function SelectStatus() {
 const {status, setStatus} = useTasksContext();
  const options = [
    { key: '', label: 'All' },
    { key: 'completed', label: 'Completed' },
    { key: 'inprogress', label: 'In Progress' },
  ];


  return (
    <div className='w-full md:w-[180px] lg:w-[200px]'>
      <Select
        label='Filter by Status'
        size='sm'
        selectedKeys={[status]}
        onSelectionChange={(selected) => {
          const selectedKey = Array.from(selected)[0] as string;
          setStatus(selectedKey);
        }}
        classNames={{
          trigger: 'w-full md:w-[180px] lg:w-[200px] bg-[#ffffff]',
          listboxWrapper: 'w-full md:w-[180px] lg:w-[200px]',
        }}
      >
        {options.map((item) => (
          <SelectItem key={item.key} value={item.key}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
