import { CircularProgress } from '@nextui-org/progress';
import { Chip } from '@nextui-org/chip';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';
import { useTasks } from '@/hooks/use-tasks';

export default function HeaderProgressbar() {
  const { data, isLoading } = useTasks({ status: 'completed' });

  const totalTasks = data?.count || 0;
  const completedTasks = data?.total || 0;

  const progressValue =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  console.log(totalTasks);
  console.log(completedTasks);

  console.log(progressValue);

  return (
    <Card className='border-none shadow-none bg-transparent'>
      <CardBody className='justify-center items-center pb-0'>
        <CircularProgress
          aria-label='Progressbar'
          classNames={{
            svg: 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 drop-shadow-sm',
            indicator: 'stroke-[#577ab2]',
            track: 'stroke-[#d7d7d7]',
            value: 'text-3xl text-[#333333]',
          }}
          size='lg'
          value={progressValue}
          strokeWidth={2}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className='justify-center items-center pt-4'>
        <Skeleton isLoaded={!isLoading} className='w-full rounded-lg'>
          <Chip variant='solid' className='bg-[#577ab2] text-white'>
            {`${completedTasks}/${totalTasks} tasks completed`}
          </Chip>
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
