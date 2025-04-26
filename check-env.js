require('dotenv').config({ path: '.env.local' });

console.log('Checking Shopify environment variables...');
console.log('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:', process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
console.log('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:', process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? '✓ Set' : '✗ Not set'); 