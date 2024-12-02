import ButtonMarkAllCompleted from '../ui/button-markall-completed';
import InputSearch from '../ui/input-search';
import SelectStatus from '../ui/select-status';

export default function FilterTask() {
  return (
    <div className='flex flex-col md:flex-row justify-between md:items-center gap-8 mt-12'>
      <div className='w-[40%] sm:w-[30%] lg:w-[50%]'>
        <ButtonMarkAllCompleted />
      </div>
      <div className='flex-1 flex flex-col md:flex-row gap-4'>
        <div className='order-2 md:order-1'>
          <SelectStatus />
        </div>

        <div className='order- 1 md:order-2 flex-1'>
          <InputSearch />
        </div>
      </div>
    </div>
  );
}
