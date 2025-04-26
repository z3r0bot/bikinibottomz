'use client';

export default function EnvDebug() {
  return (
    <div className="fixed top-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg z-50">
      <h3 className="font-bold mb-2">Environment Variables</h3>
      <pre className="text-xs whitespace-pre-wrap">
        {JSON.stringify({
          NODE_ENV: process.env.NODE_ENV,
          NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
          HAS_TOKEN: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        }, null, 2)}
      </pre>
    </div>
  );
} 