import { formatDate } from '@/utils/helper';

export default function HeaderDesc() {
  return (
    <div>
      <h1 className='text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold mb-2 text-[#333333]'>
        Today&apos;s Tasks
      </h1>
      <p className='hidden md:block text-base lg:text-lg text-gray-600 italic mb-4'>
        Manage your tasks and boost your productivity
      </p>
      <h2 className='text-sm sm:text-lg md:text-xl lg:text-2xl text-[#333333]'>
        {formatDate(new Date(), 'dddd, D MMMM YYYY')}
      </h2>
    </div>
  );
}
