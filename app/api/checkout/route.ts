import { NextResponse } from 'next/server';

// GraphQL mutation
const CREATE_CHECKOUT_MUTATION = `
  mutation createCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_KEY) {
    return NextResponse.json(
      { error: 'Shopify configuration is missing' },
      { status: 500 }
    );
  }

  try {
    const { variantId, quantity } = await request.json();

    // Use fetch directly to avoid type issues
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_KEY,
        },
        body: JSON.stringify({
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
        }),
      }
    );

    const result = await response.json();

    if (result.errors) {
      return NextResponse.json(
        { error: result.errors[0].message },
        { status: 400 }
      );
    }

    if (result.data.checkoutCreate.checkoutUserErrors.length > 0) {
      return NextResponse.json(
        { error: result.data.checkoutCreate.checkoutUserErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      checkoutUrl: result.data.checkoutCreate.checkout.webUrl,
    });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    );
  }
} 