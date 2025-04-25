'use client';

import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-primary-light text-text-light transition-colors duration-300">
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
} 