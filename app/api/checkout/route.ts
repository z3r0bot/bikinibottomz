import { NextResponse } from 'next/server';
import { shopifyClient, CREATE_CHECKOUT_MUTATION } from '@/lib/shopify';

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_KEY) {
    return NextResponse.json(
      { error: 'Shopify configuration is missing' },
      { status: 500 }
    );
  }

  try {
    const { variantId, quantity } = await request.json();

    const { data } = await shopifyClient.query({
      query: CREATE_CHECKOUT_MUTATION,
      variables: {
        input: {
          lineItems: [
            {
              variantId,
              quantity: quantity || 1,
            },
          ],
        },
      },
    });

    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      return NextResponse.json(
        { error: data.checkoutCreate.checkoutUserErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      checkoutUrl: data.checkoutCreate.checkout.webUrl,
    });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    );
  }
} 