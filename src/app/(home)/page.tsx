import { Footer } from '@/components/core/footer';
import { Hero } from '@/components/core/hero';
import { LogoSection } from '@/components/core/logo-section';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center gap-8 p-4 sm:gap-12 md:p-6'>
      <AnimatedGridPattern
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] sm:[mask-image:radial-gradient(650px_circle_at_center,white,transparent)]',
          'absolute inset-0 -z-10'
        )}
      />

      <div className='flex w-full flex-1 flex-col items-center justify-center gap-4 sm:gap-6'>
        <LogoSection />
        <Hero />
      </div>

      <Footer />
    </main>
  );
}
