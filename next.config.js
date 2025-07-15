/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SWC native binary to avoid loading issues
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
  // Use Babel as fallback
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['*.phncdn.com', 'phncdn.com', 'api.adultdatalink.com'],
    unoptimized: true
  },
  // Webpack configuration for better compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig