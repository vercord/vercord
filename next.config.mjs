import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  devIndicators: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbgegowfpr.ufs.sh',
        port: '',
        pathname: '/f/**'
      },
      {
        protocol: 'https',
        hostname: 'vercel.com',
        port: '',
        pathname: '/button'
      }
    ]
  }
};

export default withMDX(config);
