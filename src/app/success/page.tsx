'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-600">Thank You!</h1>
        <p className="text-xl">Your order has been successfully placed.</p>
        <p className="text-gray-600">
          Order ID: {sessionId}
        </p>
        <Link
          href="/shop"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
} 