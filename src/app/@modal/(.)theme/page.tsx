'use client';

import { useRouter } from 'next/navigation';

import { ThemeSelector } from '@/components/themes/theme-selector';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle
} from '@/components/ui/dialog';

export default function ThemeModal() {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogOverlay />
      <DialogContent className='w-[380px] sm:max-w-[380px]'>
        <DialogTitle className='sr-only'>Theme Selector</DialogTitle>
        <ThemeSelector isModal={true} />
      </DialogContent>
    </Dialog>
  );
}
