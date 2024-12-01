'use client';

import { useState } from 'react';
import InputTask from '../ui/input';

export default function FormTask() {
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-screen-sm mx-auto mt-4'>
      <InputTask value={value} setValue={setValue} />
    </form>
  );
}
