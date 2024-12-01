'use client';

import { CircularProgress } from '@nextui-org/progress';
import { Chip } from '@nextui-org/chip';
import { Card, CardBody, CardFooter } from '@nextui-org/card';

export default function HeaderProgressbar() {
  return (
    <Card className='border-none shadow-none bg-transparent'>
      <CardBody className='justify-center items-center pb-0'>
        <CircularProgress
          aria-label='Progressbar'
          classNames={{
            svg: 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 drop-shadow-sm',
            indicator: 'stroke-[#577ab2]',
            track: 'stroke-[#d7d7d7]',
            value: 'text-3xl text-[#577ab2]',
          }}
          size='lg'
          value={70}
          strokeWidth={2}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className='justify-center items-center pt-4'>
        <Chip variant='solid' className='bg-[#577ab2] text-white'>
          7/10 tasks completed
        </Chip>
      </CardFooter>
    </Card>
  );
}
