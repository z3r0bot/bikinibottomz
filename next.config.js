/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static exports for GitHub Pages
  images: {
    domains: ['images.unsplash.com', 'placehold.co'], // Add any image domains you'll use
    unoptimized: true, // Required for static exports
  },
  basePath: process.env.NODE_ENV === 'production' ? '/bikinibottomz' : '' // Add basePath for GitHub Pages
}

module.exports = nextConfig 