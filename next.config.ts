import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [new URL('https://placehold.co/**')],
  },
};

export default nextConfig;
