'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type FC, useEffect, useState } from 'react';

export const LogoSection: FC = function LogoSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      aria-label='Product logos'
      className='relative mb-4 flex flex-wrap items-center justify-center gap-6 px-4'
    >
      <div className='flex items-center gap-6'>
        <Link
          href='https://vercel.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Visit Vercel website'
          className={`group focus-visible:ring-ring focus-visible:ring-offset-background relative transform-gpu rounded-lg p-2 transition-all duration-500 ease-out hover:scale-110 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <Image
            className='relative drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-lg dark:invert'
            src='https://chmgukzv37.ufs.sh/f/m5aDeKXl439Zm6uT4fXl439ZQL6zUSaIchFgHvWwyeMCYxKj'
            alt='Vercel Logo'
            width={120}
            height={25}
            priority
          />
          <div className='via-foreground/5 absolute inset-0 rounded-lg bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        </Link>

        <div
          className={`relative flex items-center transition-all duration-500 ease-out ${
            isLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span
            className='text-muted-foreground animate-pulse text-2xl font-light select-none'
            aria-hidden='true'
          >
            ×
          </span>
        </div>

        <Link
          href='https://discord.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Visit Discord website'
          className={`group focus-visible:ring-ring focus-visible:ring-offset-background relative transform-gpu rounded-lg p-2 transition-all duration-500 ease-out hover:scale-110 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <Image
            className='relative drop-shadow-sm transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-lg'
            src='https://chmgukzv37.ufs.sh/f/m5aDeKXl439Z2ZTdqqJGz6uy3qnLPteHEfS1lUO5dZw9V0pD'
            alt='Discord Logo'
            width={40}
            height={40}
            priority
          />
          <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        </Link>
      </div>
    </section>
  );
};
