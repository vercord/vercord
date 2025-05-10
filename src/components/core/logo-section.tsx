import Image from 'next/image';
import { type FC, Suspense } from 'react';

import LogoSwitcher from '@/components/core/logo-switcher';

const LogoFallback = () => (
  <div className='bg-muted/20 h-[25px] w-[120px] animate-pulse rounded' />
);

const DiscordLogoFallback = () => (
  <div className='bg-muted/20 h-[50px] w-[50px] animate-pulse rounded-lg' />
);

export const LogoSection: FC = function LogoSection() {
  return (
    <section
      aria-label='Product logos'
      className='relative mb-4 flex flex-wrap items-center justify-center gap-6 px-4'
    >
      <Suspense fallback={<LogoFallback />}>
        <LogoSwitcher />
      </Suspense>
      <span
        className='text-muted-foreground text-3xl font-bold'
        aria-hidden='true'
      >
        ×
      </span>
      <div className='transform-gpu transition-all duration-300 hover:scale-105'>
        <Suspense fallback={<DiscordLogoFallback />}>
          <Image
            className='relative drop-shadow-[0_0_0.3rem_rgba(88,101,242,0.4)]'
            src='/discord.svg'
            alt='Discord Logo'
            width={50}
            height={50}
            priority
          />
        </Suspense>
      </div>
    </section>
  );
};
