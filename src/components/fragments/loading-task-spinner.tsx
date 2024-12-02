import { Spinner } from '@nextui-org/spinner';

export default function LoadingTaskSpinner() {
  return (
    <section className='container max-w-screen-xl mx-auto my-8'>
      <div className='min-h-[30vh] flex justify-center items-center p-4 rounded-lg'>
        <Spinner size='lg' />
      </div>
    </section>
  );
}
