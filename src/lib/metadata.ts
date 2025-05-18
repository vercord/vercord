import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://vercord.lol',
      images: 'https://vercord.lol/og.jpg',
      siteName: 'vercord.lol',
      ...override.openGraph
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@ogeperc',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: 'https://vercord.lol/og.jpg',
      ...override.twitter
    }
  };
}

export const title = 'Vercord - Vercel to Discord';
export const description =
  'Seamlessly integrate your Vercel deployment notifications with Discord.';

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_URL!}`);

export const baseUrlProd = 'https://vercord.lol';

export const githubUrl = `https://github.com/vercord/portfolio`;
export const twitterUsername = 'ogeperc';
