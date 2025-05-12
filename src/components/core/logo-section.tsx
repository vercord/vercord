import Image from 'next/image';
import Link from 'next/link';
import { type FC, Suspense } from 'react';

const VercelLogoFallback = () => (
  <div className='bg-muted/20 h-[25px] w-[120px] animate-pulse rounded' />
);

const DiscordLogoFallback = () => (
  <div className='bg-muted/20 h-[30px] w-[30px] animate-pulse rounded-lg' />
);

export const LogoSection: FC = function LogoSection() {
  return (
    <section
      aria-label='Product logos'
      className='relative mb-4 flex flex-wrap items-center justify-center gap-4 px-4'
    >
      <div className='transform-gpu transition-all duration-300 hover:scale-105'>
        <Suspense fallback={<VercelLogoFallback />}>
          <Link
            href='https://vercel.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Visit Vercel website'
          >
            <Image
              className='relative drop-shadow-[0_0_0.3rem_rgba(0,0,0,0.4)] dark:drop-shadow-[0_0_0.3rem_rgba(255,255,255,0.4)] dark:invert'
              src='/vercel.svg'
              alt='Vercel Logo'
              width={120}
              height={25}
              priority
            />
          </Link>
        </Suspense>
      </div>
      <span
        className='text-muted-foreground text-2xl font-bold'
        aria-hidden='true'
      >
        ×
      </span>
      <div className='transform-gpu transition-all duration-300 hover:scale-105'>
        <Suspense fallback={<DiscordLogoFallback />}>
          <Link
            href='https://discord.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Visit Discord website'
          >
            <Image
              className='relative drop-shadow-[0_0_0.3rem_rgba(88,101,242,0.4)]'
              src='/discord.svg'
              alt='Discord Logo'
              width={40}
              height={40}
              priority
            />
          </Link>
        </Suspense>
      </div>
    </section>
  );
};
