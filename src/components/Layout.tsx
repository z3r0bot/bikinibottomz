'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark transition-colors duration-300">
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
} 