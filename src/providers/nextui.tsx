// app/providers.tsx
'use client';

import { NextUIProvider as NextProvider } from '@nextui-org/react';

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  return <NextProvider>{children}</NextProvider>;
}
