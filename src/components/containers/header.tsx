import HeaderDesc from '../fragments/header-desc';
import HeaderProgressbar from '../fragments/header-progressbar';

export default function Header() {
  return (
    <header className='flex flex-row justify-between items-center gap-4 sm:gap-0 py-4'>
      <HeaderDesc />
      <HeaderProgressbar />
    </header>
  );
}
