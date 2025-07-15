/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['*.phncdn.com', 'phncdn.com'],
    unoptimized: true
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig