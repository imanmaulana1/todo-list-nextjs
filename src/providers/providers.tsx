import { TaskProvider } from '@/contexts/task-context';
import { NextUIProvider } from './nextui';
import { ReactQueryProvider } from './react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextUIProvider>
        <TaskProvider>{children}</TaskProvider>
      </NextUIProvider>
    </ReactQueryProvider>
  );
}
