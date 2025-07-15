/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['*.phncdn.com', 'phncdn.com'],
    unoptimized: true
  }
}

module.exports = nextConfig