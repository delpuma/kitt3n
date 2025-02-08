import { withPayload } from '@payloadcms/next/withPayload'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, assert: false };
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      'node:assert': require.resolve('assert/'),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: new URL(NEXT_PUBLIC_SERVER_URL).hostname,
        protocol: new URL(NEXT_PUBLIC_SERVER_URL).protocol.replace(':', ''),
      },
    ],
  },
  reactStrictMode: false,
}

export default withPayload(nextConfig)
