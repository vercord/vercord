import { ThemeSelector } from '@/components/themes/theme-selector';

export default function ThemePage() {
  return (
    <div className='grid min-h-svh place-items-center'>
      <div className='w-[340px]'>
        <ThemeSelector />
      </div>
    </div>
  );
}
