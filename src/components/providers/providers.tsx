'use client';

import * as React from 'react';

import { ActiveThemeProvider } from '@/components/themes/active-theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ActiveThemeProvider>{children}</ActiveThemeProvider>;
}
