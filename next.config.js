import { withPayload } from '@payloadcms/next/withPayload';
import redirects from './redirects.js';

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
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // ✅ Fixes "Module not found: Can't resolve 'fs'"
      path: false, // ✅ Fixes "Module not found: Can't resolve 'path'"
      worker_threads: false, // ✅ Fixes "Module not found: Can't resolve 'worker_threads'"
      assert: false, // ✅ Fixes "UnhandledSchemeError: node:assert"
    };
    return config;
  },
  redirects,
};

export default withPayload(nextConfig);
