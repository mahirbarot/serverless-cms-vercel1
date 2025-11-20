/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['vercel-blob-storage.com', 'vercel.com'],
  },
}

module.exports = nextConfig

