'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { type FC, useCallback, useEffect, useState } from 'react';

interface LogoItem {
  id: string;
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  hoverEffect?: 'scale' | 'brightness' | 'glow';
}

const logos: LogoItem[] = [
  {
    id: 'vercel',
    href: 'https://vercel.com',
    src: 'https://chmgukzv37.ufs.sh/f/m5aDeKXl439Zm6uT4fXl439ZQL6zUSaIchFgHvWwyeMCYxKj',
    alt: 'Vercel - The Frontend Cloud',
    width: 120,
    height: 25,
    className: 'dark:invert',
    hoverEffect: 'glow'
  },
  {
    id: 'discord',
    href: 'https://discord.com',
    src: 'https://chmgukzv37.ufs.sh/f/m5aDeKXl439Z2ZTdqqJGz6uy3qnLPteHEfS1lUO5dZw9V0pD',
    alt: 'Discord - Where Communities Thrive',
    width: 40,
    height: 40,
    hoverEffect: 'brightness'
  }
];

const LogoLink: FC<{
  logo: LogoItem;
  index: number;
  isLoaded: boolean;
  prefersReducedMotion: boolean;
}> = ({ logo, index, isLoaded, prefersReducedMotion }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const animationVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      scale: prefersReducedMotion ? 1 : 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: 'easeOut'
      }
    }
  };

  const hoverVariants: Variants = {
    hover: {
      scale: prefersReducedMotion ? 1 : 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: {
      scale: prefersReducedMotion ? 1 : 0.98
    }
  };

  return (
    <motion.div
      variants={animationVariants}
      initial='hidden'
      animate={isLoaded ? 'visible' : 'hidden'}
      whileHover='hover'
      whileTap='tap'
      className='relative'
    >
      <Link
        href={logo.href}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Visit ${logo.alt}`}
        className={`group focus-visible:ring-offset-background relative block rounded-xl p-3 transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none ${imageError ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} `}
      >
        {/* Background glow effect */}
        <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10' />

        {/* Image container with loading state */}
        <div className='relative flex items-center justify-center'>
          {!imageLoaded && !imageError && (
            <div
              className='animate-pulse rounded bg-gray-200 dark:bg-gray-700'
              style={{ width: logo.width, height: logo.height }}
              aria-label='Loading logo'
            />
          )}

          {imageError ? (
            <div
              className='flex items-center justify-center rounded bg-gray-100 text-xs text-gray-400 dark:bg-gray-800'
              style={{ width: logo.width, height: logo.height }}
            >
              Failed to load
            </div>
          ) : (
            <motion.div variants={hoverVariants} className='relative'>
              <Image
                src={logo.src || '/placeholder.svg'}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                priority={index === 0}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`relative transition-all duration-300 ease-out ${logo.className || ''} ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${logo.hoverEffect === 'brightness' ? 'group-hover:brightness-110' : ''} drop-shadow-sm group-hover:drop-shadow-lg`}
              />

              {/* Glow effect for specific logos */}
              {logo.hoverEffect === 'glow' && (
                <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100' />
              )}
            </motion.div>
          )}
        </div>

        {/* Ripple effect on click */}
        <div className='absolute inset-0 overflow-hidden rounded-xl'>
          <div className='absolute inset-0 scale-0 rounded-full bg-white/20 transition-transform duration-300 group-active:scale-100' />
        </div>
      </Link>
    </motion.div>
  );
};

const Separator: FC<{ isLoaded: boolean; prefersReducedMotion: boolean }> = ({
  isLoaded,
  prefersReducedMotion
}) => (
  <motion.div
    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.5 }}
    animate={{
      opacity: isLoaded ? 1 : 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.4,
        delay: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeOut'
      }
    }}
    className='flex items-center justify-center'
  >
    <span
      className='text-muted-foreground/60 text-2xl font-light transition-colors duration-300 select-none'
      aria-hidden='true'
    >
      ×
    </span>
  </motion.div>
);

export const LogoSection: FC = function LogoSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Stagger the loading animation
    const timer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      prefersReducedMotion ? 50 : 150
    );

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      aria-label='Partner logos and integrations'
      className='relative mb-8 px-4'
    >
      <div className='mx-auto max-w-4xl'>
        {/* Optional heading for better accessibility */}
        <div className='sr-only'>
          <h2>Our Technology Partners</h2>
          <p>Built with industry-leading platforms and tools</p>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-8 sm:gap-12'>
          {logos.map((logo, index) => (
            <div key={logo.id} className='flex items-center gap-8 sm:gap-12'>
              <LogoLink
                logo={logo}
                index={index}
                isLoaded={isLoaded}
                prefersReducedMotion={!!prefersReducedMotion}
              />

              {/* Add separator between logos, but not after the last one */}
              {index < logos.length - 1 && (
                <Separator
                  isLoaded={isLoaded}
                  prefersReducedMotion={!!prefersReducedMotion}
                />
              )}
            </div>
          ))}
        </div>

        {/* Subtle background decoration */}
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl' />
        </div>
      </div>
    </section>
  );
};
