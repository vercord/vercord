'use client';

import * as React from 'react';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { ActiveThemeProvider } from '@/components/themes/active-theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <ActiveThemeProvider>{children}</ActiveThemeProvider>
    </ThemeProvider>
  );
}
