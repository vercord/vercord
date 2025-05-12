'use client';
import {
  CheckIcon,
  MonitorIcon,
  MoonIcon,
  RepeatIcon,
  SunIcon,
  X as XIcon
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { useThemeConfig } from '@/components/themes/active-theme';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { baseThemes } from '@/lib/themes';
import { cn } from '@/lib/utils';

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme: theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='w-full'>
      <div className='flex items-start justify-between pt-4 md:pt-0'>
        <div className='space-y-1'>
          <div className='font-semibold tracking-tight'>Customize</div>
          <div className='text-muted-foreground text-xs'>
            Choose your style and color preferences
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            className='hover:bg-muted rounded-[0.5rem] transition-colors'
            onClick={() => setTheme('system')}
            aria-label='Reset to system theme'
          >
            <RepeatIcon className='size-4' />
          </Button>
          <Button
            asChild
            variant='ghost'
            size='icon'
            className='hover:bg-muted rounded-[0.5rem] transition-colors'
            aria-label='Close theme selector'
          >
            <Link href='/'>
              <XIcon className='size-4' />
            </Link>
          </Button>
        </div>
      </div>

      <div className='mt-6 flex flex-col space-y-6'>
        {/* Color Theme Selection */}
        <div className='space-y-3'>
          <Label className='text-muted-foreground text-xs font-medium'>
            Color Theme
          </Label>
          <div className='flex flex-col gap-2.5'>
            {baseThemes.map(color => {
              const isActive = activeTheme === color.name;

              return mounted ? (
                <Button
                  variant='outline'
                  size='sm'
                  key={color.name}
                  onClick={() => setActiveTheme(color.name)}
                  className={cn(
                    'justify-start transition-all duration-200',
                    isActive && 'border-primary dark:border-primary border-2'
                  )}
                  style={
                    {
                      '--theme-primary': `${
                        color?.activeColor[theme === 'dark' ? 'dark' : 'light']
                      }`
                    } as React.CSSProperties
                  }
                >
                  <span className='mr-2 flex size-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[var(--theme-primary)]'>
                    {isActive && <CheckIcon className='size-3.5 text-white' />}
                  </span>
                  {color.label}
                </Button>
              ) : (
                <Skeleton className='h-8 w-full' key={color.name} />
              );
            })}
          </div>
        </div>

        {/* Mode Selection */}
        <div className='space-y-3'>
          <Label className='text-muted-foreground text-xs font-medium'>
            Appearance Mode
          </Label>
          <div className='grid grid-cols-3 gap-2.5'>
            {mounted ? (
              <>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setTheme('light')}
                  className={cn(
                    'transition-all duration-200',
                    theme === 'light' && 'border-primary border-2'
                  )}
                  aria-label='Light mode'
                >
                  <SunIcon className='mr-2 size-4 -translate-x-1' />
                  Light
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'transition-all duration-200',
                    theme === 'dark' &&
                      'border-primary dark:border-primary border-2'
                  )}
                  aria-label='Dark mode'
                >
                  <MoonIcon className='mr-2 size-4 -translate-x-1' />
                  Dark
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setTheme('system')}
                  className={cn(
                    'transition-all duration-200',
                    theme !== 'light' &&
                      theme !== 'dark' &&
                      'border-primary dark:border-primary border-2'
                  )}
                  aria-label='System mode'
                >
                  <MonitorIcon className='mr-2 size-4 -translate-x-1' />
                  System
                </Button>
              </>
            ) : (
              <>
                <Skeleton className='h-8 w-full' />
                <Skeleton className='h-8 w-full' />
                <Skeleton className='h-8 w-full' />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
