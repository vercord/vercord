'use client';

import { BookOpen, Github } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { githubUrl } from '@/lib/metadata';

export function Hero() {
  return (
    <div className='mx-auto flex max-w-md flex-col items-center justify-center gap-6 px-2 text-center sm:max-w-2xl sm:gap-8 sm:px-4'>
      <div className='space-y-4'>
        <h1 className='text-foreground text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl'>
          Connect <span className='text-primary font-bold'>Vercel</span> to
          Discord
        </h1>
        <p className='text-muted-foreground mx-auto max-w-lg text-base sm:text-lg'>
          Seamlessly integrate your Vercel deployment notifications with
          Discord. Stay updated on every deployment status in real-time.
        </p>
      </div>

      <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
        <Button asChild className='group w-full sm:w-auto'>
          <Link href='/docs'>
            Getting Started
            <BookOpen className='ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:h-5 sm:w-5' />
          </Link>
        </Button>
        <Button
          asChild
          className='group w-full sm:w-auto'
          variant='primary-outline'
        >
          <Link href={githubUrl} target='_blank' rel='noopener noreferrer'>
            View on GitHub
            <Github className='ml-1.5 h-4 w-4 transition-transform group-hover:rotate-12 sm:h-5 sm:w-5' />
          </Link>
        </Button>
      </div>
    </div>
  );
}
