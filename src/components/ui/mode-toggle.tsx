'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='icon'
      className='hover:bg-accent/50 h-9 w-9 rounded-full transition-all duration-300'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label='Toggle theme'
    >
      <Sun className='text-muted-foreground h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90' />
      <Moon className='text-muted-foreground absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0' />
    </Button>
  );
}
