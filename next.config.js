import { withPayload } from '@payloadcms/next/withPayload';
import redirects from './redirects.js';
import webpack from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.VERCEL_PROJECT_PRODUCTION_URL
          ? process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/^https?:\/\//, '')
          : process.env.NEXT_PUBLIC_SERVER_URL?.replace(/^https?:\/\//, '') || 'localhost',
      },
    ],
  },
  serverExternalPackages: ['@payloadcms/db-postgres'], // ✅ Fix for Next.js API change
  webpack: (config) => {
    // ✅ Ensure 'worker_threads' and 'fs' are ignored on client-side
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      worker_threads: false, // 🚀 FIX for your error
    };

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      })
    );

    return config;
  },
  redirects,
};

export default withPayload(nextConfig);
