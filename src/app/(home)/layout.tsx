import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

import { baseOptions } from '@/app/layout.config';
import { layoutLinks } from '@/consts/layout-links';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions} links={layoutLinks}>
      {children}
    </HomeLayout>
  );
}
