import Link from 'next/link';
import { type FC } from 'react';

export const Footer: FC = function Footer() {
  return (
    <footer
      className='w-full max-w-full px-4 pt-6 pb-4 sm:fixed sm:bottom-4'
      aria-label='Page footer'
    >
      <div className='flex flex-col items-center gap-2'>
        <p className='text-muted-foreground text-center text-xs text-balance drop-shadow-[0_0_8px_rgba(156,163,175,0.5)] sm:text-sm'>
          This site is not affiliated with or endorsed by{' '}
          <Link
            href='https://vercel.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground underline transition-colors duration-200'
          >
            Vercel
          </Link>{' '}
          or{' '}
          <Link
            href='https://discord.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground underline transition-colors duration-200'
          >
            Discord
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};
