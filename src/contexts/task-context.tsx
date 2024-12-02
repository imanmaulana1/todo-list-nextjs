'use client';

import { createContext, useState, ReactNode } from 'react';

type TaskContextType = {
  status: string;
  setStatus: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<string>('');
  const [query, setQuery] = useState('');

  return (
    <TaskContext.Provider value={{ status, setStatus, query, setQuery }}>
      {children}
    </TaskContext.Provider>
  );
};
