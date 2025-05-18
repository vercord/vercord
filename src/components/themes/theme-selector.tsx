'use client';

import {
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { baseThemes } from '@/lib/themes';

interface ThemeSelectorProps {
  isModal?: boolean;
}

export function ThemeSelector({ isModal }: ThemeSelectorProps = {}) {
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
        {!isModal && (
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
        )}
      </div>

      <div className='mt-6 flex flex-col space-y-6'>
        {/* Color Theme Selection */}
        <div className='space-y-3'>
          <Label className='text-muted-foreground text-xs font-medium'>
            Color Theme
          </Label>
          {mounted ? (
            <Select value={activeTheme} onValueChange={setActiveTheme}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a theme' />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className='max-h-[240px]'>
                  {baseThemes.map(color => (
                    <SelectItem
                      key={color.name}
                      value={color.name}
                      className='flex items-center'
                    >
                      <div className='flex items-center'>
                        <span
                          className='mr-2 inline-block size-4 rounded-full'
                          style={{
                            backgroundColor:
                              color?.activeColor[
                                theme === 'dark' ? 'dark' : 'light'
                              ]
                          }}
                        />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          ) : (
            <Skeleton className='h-10 w-full' />
          )}
        </div>

        {/* Mode Selection */}
        <div className='space-y-3'>
          <Label className='text-muted-foreground text-xs font-medium'>
            Appearance Mode
          </Label>
          {mounted ? (
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a mode' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='light'>
                  <div className='flex items-center'>
                    <SunIcon className='mr-2 size-4' />
                    Light
                  </div>
                </SelectItem>
                <SelectItem value='dark'>
                  <div className='flex items-center'>
                    <MoonIcon className='mr-2 size-4' />
                    Dark
                  </div>
                </SelectItem>
                <SelectItem value='system'>
                  <div className='flex items-center'>
                    <MonitorIcon className='mr-2 size-4' />
                    System
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Skeleton className='h-10 w-full' />
          )}
        </div>

        {/* Add reset button at the bottom for modal mode */}
        {isModal && (
          <div className='flex justify-center'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setTheme('system')}
              className='px-4'
              aria-label='Reset to system theme'
            >
              <RepeatIcon className='mr-2 size-4' />
              Reset Theme
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
