/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static exports for GitHub Pages
  images: {
    unoptimized: true, // Required for static exports
  },
  basePath: process.env.NODE_ENV === 'production' ? '/bikinibottomz' : '', // Add basePath for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/bikinibottomz/' : '', // Add assetPrefix for GitHub Pages
}

module.exports = nextConfig 