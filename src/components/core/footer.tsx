import Link from 'next/link';
import { type FC } from 'react';

export const Footer: FC = function Footer() {
  return (
    <footer className='fixed bottom-4 w-full px-4' aria-label='Page footer'>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-muted-foreground text-center text-sm text-balance drop-shadow-[0_0_8px_rgba(156,163,175,0.5)]'>
          This site is not affiliated with or endorsed by{' '}
          <Link
            href='https://vercel.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground transition-colors duration-200 hover:underline'
          >
            Vercel
          </Link>{' '}
          or{' '}
          <Link
            href='https://discord.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground transition-colors duration-200 hover:underline'
          >
            Discord
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};
