import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thecompany.mxksimdev.com',
        port: '',
        pathname: '/api/files/**',
      },
    ],
  },
};

export default nextConfig;
