import './global.css';

import { RootProvider } from 'fumadocs-ui/provider';
import { type Metadata } from 'next';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';

import { Providers } from '@/components/providers/providers';
import { description, title } from '@/consts/metadata';

const geist = Geist({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: title,
  description: description,
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'application-name': title,
    'apple-mobile-web-app-title': title
  }
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={geist.className} suppressHydrationWarning>
      <body
        className='theme-default flex min-h-screen flex-col'
        suppressHydrationWarning
      >
        <RootProvider>
          <Providers>{children}</Providers>
        </RootProvider>
      </body>
    </html>
  );
}
