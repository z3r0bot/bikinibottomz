'use client';

import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Welcome to BikinibottomZ
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover our curated collection of fashion, beauty, and crystal accessories.
          </p>
          <button className="btn btn-primary">Explore Collection</button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-secondary-light dark:bg-secondary-dark">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">Shop by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Fashion', 'Beauty', 'Summer', 'Crystals'].map((category) => (
              <div
                key={category}
                className="aspect-square bg-primary-light dark:bg-primary-dark rounded-lg p-6 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <h4 className="text-xl font-semibold">{category}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-8">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full bg-secondary-light dark:bg-secondary-dark"
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
} 