import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const categories = [
    {
      name: 'Fashion',
      description: 'Discover our newest arrivals in underwater fashion',
      image: 'https://placehold.co/600x400/purple/white?text=Fashion',
      href: '/categories/fashion',
    },
    {
      name: 'Beauty',
      description: 'Special offers on selected items',
      image: 'https://placehold.co/600x400/purple/white?text=Beauty',
      href: '/categories/beauty',
    },
    {
      name: 'Crystals',
      description: 'Explore our crystal collection',
      image: 'https://placehold.co/600x400/purple/white?text=Crystals',
      href: '/categories/crystals',
    },
    {
      name: 'Summer',
      description: 'Get ready for summer',
      image: 'https://placehold.co/600x400/purple/white?text=Summer',
      href: '/categories/summer',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-purple-100">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Bikini Bottomz
            </h1>
            <p className="text-lg text-gray-800 mb-8">
              Your premier destination for underwater fashion and accessories
            </p>
            <Link
              href="/products"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative h-64 overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/40 transition-colors z-10" />
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/90">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Latest Collections
              </h3>
              <p className="text-gray-600">
                Discover our newest arrivals in underwater fashion
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Exclusive Deals
              </h3>
              <p className="text-gray-600">
                Special offers on selected items
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600">
                On orders over $50
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 