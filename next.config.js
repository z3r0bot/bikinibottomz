/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static exports for GitHub Pages
  images: {
    unoptimized: true, // Required for static exports
    domains: ['cdn.shopify.com'], // Allow Shopify CDN images
  },
  basePath: process.env.NODE_ENV === 'production' ? '/bikinibottomz' : '', // Add basePath for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/bikinibottomz/' : '', // Add assetPrefix for GitHub Pages
  // Add fallback values for environment variables
  env: {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'eswivu-v8.myshopify.com',
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  },
}

module.exports = nextConfig 