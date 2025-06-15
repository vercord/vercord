import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

import { baseOptions } from '@/app/layout.config';
import { BookIcon, PaletteIcon } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          icon: <BookIcon />,
          text: 'Documentation',
          url: '/docs'
        },
        {
          icon: <PaletteIcon />,
          text: 'Themes',
          url: '/theme'
        }
      ]}
    >
      {children}
    </HomeLayout>
  );
}
