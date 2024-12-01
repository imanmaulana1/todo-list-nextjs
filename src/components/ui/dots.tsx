interface DotsProps {
  isFocus?: boolean;
}

export default function Dots({ isFocus }: DotsProps) {
  const colors = ['bg-[#ff8a80]', 'bg-[#80cbc4]', 'bg-[#ffb74d]'];
  return (
    <div className='flex justify-between items-center gap-2 mr-4'>
      {[...Array(3)].map((_, index) => (
        <div
          className={`h-3 w-3 rounded-full ${colors[index]} ${
            isFocus && 'animate-wave'
          } dot-${index}`}
          key={index}
        ></div>
      ))}
    </div>
  );
}
