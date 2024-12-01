import { NextUIProvider } from './nextui';
import { ReactQueryProvider } from './react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ReactQueryProvider>
  );
}
