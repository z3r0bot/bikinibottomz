import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Layout from '@/components/Layout';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

// Metadata needs to be in a server component
export const metadata: Metadata = {
  title: 'Bikini Bottoms - Fashion & Beauty',
  description: 'Your destination for fashion, beauty, and crystal accessories',
};

// Client component for the layout
'use client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
} 