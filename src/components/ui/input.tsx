'use client';

import { Input } from '@nextui-org/input';
import Dots from './dots';
import { useState } from 'react';

interface InputTaskProps {
  value: string;
  setValue: (value: string) => void;
}
export default function InputTask({ value, setValue }: InputTaskProps) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Input
      type='text'
      name='taskName'
      placeholder={isFocus ? 'Press enter...' : 'What is your next task?'}
      startContent={<Dots isFocus={isFocus} />}
      variant='bordered'
      size='lg'
      classNames={{
        label: 'sr-only',
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
      value={value}
      onValueChange={setValue}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
}
