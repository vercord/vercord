import './global.css';

import { RootProvider } from 'fumadocs-ui/provider';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';

import { ActiveThemeProvider } from '@/components/themes/active-theme';
import {
  baseUrlProd,
  createMetadata,
  description,
  title
} from '@/lib/metadata';

const geist = Geist({
  subsets: ['latin']
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={geist.className} suppressHydrationWarning>
      <body
        className='theme-default flex min-h-screen flex-col'
        suppressHydrationWarning
      >
        <RootProvider>
          <ActiveThemeProvider>{children}</ActiveThemeProvider>
        </RootProvider>
      </body>
    </html>
  );
}

export const metadata = createMetadata({
  title: {
    default: title,
    template: `%s | ${title}`
  },
  description: description,
  metadataBase: new URL(baseUrlProd)
});
