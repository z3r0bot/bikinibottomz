/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Add any image domains you'll use
    unoptimized: true,
  },
  // Enable static exports for AWS Amplify
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/bikinibottomz' : '',
}

module.exports = nextConfig 