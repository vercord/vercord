import Image from 'next/image';
import { memo } from 'react';

type LogoImageProps = {
  src: string;
  alt: string;
};

const LogoImage = memo(function LogoImage({ src, alt }: LogoImageProps) {
  return (
    <Image
      className='relative transform-gpu drop-shadow-[0_0_0.3rem_rgba(var(--foreground-rgb),0.4)] hover:scale-105 dark:invert'
      src={src}
      alt={alt}
      width={120}
      height={25}
      priority
      style={{ objectFit: 'contain', backgroundColor: 'transparent' }}
    />
  );
});

export default LogoImage;
