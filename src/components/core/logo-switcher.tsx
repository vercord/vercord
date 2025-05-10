'use client';

import { type FC, memo, useCallback, useEffect, useState } from 'react';

import LogoImage from '@/components/core/logo-image';

type LogoType = 'vercel' | 'next';

const LogoSwitcher: FC = function LogoSwitcher() {
  const [currentLogo, setCurrentLogo] = useState<LogoType>('vercel');

  const toggleLogo = useCallback(() => {
    setCurrentLogo(prev => (prev === 'vercel' ? 'next' : 'vercel'));
  }, []);

  useEffect(() => {
    const interval = setInterval(toggleLogo, 5000);
    return () => clearInterval(interval);
  }, [toggleLogo]);

  return (
    <div
      className='relative h-[25px] w-[120px] bg-transparent'
      aria-label={`Current logo: ${currentLogo}`}
      role='img'
    >
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          currentLogo === 'vercel'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-8 opacity-0'
        } `}
        aria-hidden={currentLogo !== 'vercel'}
      >
        <LogoImage src='/vercel.svg' alt='Vercel Logo' />
      </div>

      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          currentLogo === 'next'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-8 opacity-0'
        } `}
        aria-hidden={currentLogo !== 'next'}
      >
        <LogoImage src='/next.svg' alt='Next.js Logo' />
      </div>
    </div>
  );
};

export default memo(LogoSwitcher);
