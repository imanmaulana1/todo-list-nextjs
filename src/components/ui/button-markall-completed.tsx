import { Button } from '@nextui-org/button';
import { CheckCheck } from 'lucide-react';

export default function ButtonMarkAllCompleted() {
  return (
    <div className='flex gap-4 items-center'>
      <Button color='primary' className='bg-[#577ab2]' endContent={<CheckCheck size={16}/>}>
        Mark All Completed
      </Button>
    </div>
  );
}
