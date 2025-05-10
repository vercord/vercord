import { Github } from 'lucide-react';
import Link from 'next/link';

import { Footer } from '@/components/core/footer';
import { LogoSection } from '@/components/core/logo-section';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-12 p-4'>
      <AnimatedGridPattern
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(650px_circle_at_center,white,transparent)]',
          'absolute inset-0 -z-10'
        )}
      />
      <LogoSection />

      <div className='animate-fade-in flex max-w-md flex-col items-center gap-6 text-center'>
        <h1 className='text-foreground text-2xl font-bold sm:text-3xl'>
          Connect Vercel to Discord
        </h1>
        <p className='text-muted-foreground'>
          Seamlessly integrate your Vercel deployment notifications with
          Discord. Stay updated on every deployment status in real-time.
        </p>
        <Button asChild className='group'>
          <Link
            href='https://github.com/kWAYTV/vercel-to-discord'
            target='_blank'
            rel='noopener noreferrer'
          >
            View on GitHub
            <Github className='transition-transform group-hover:rotate-12' />
          </Link>
        </Button>
      </div>

      <Footer />
    </main>
  );
}
