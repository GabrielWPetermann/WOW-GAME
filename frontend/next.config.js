/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.dicebear.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
}

module.exports = nextConfig
