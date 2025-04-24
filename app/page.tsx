export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Bikini Bottomz</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your premier destination for underwater fashion and accessories
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-4">Latest Collections</h3>
          <p className="text-gray-600">Discover our newest arrivals in underwater fashion</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-4">Exclusive Deals</h3>
          <p className="text-gray-600">Special offers on selected items</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-4">Free Shipping</h3>
          <p className="text-gray-600">On orders over $50</p>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/categories/tops" className="group">
            <div className="bg-gray-100 p-6 rounded-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold group-hover:text-blue-600">Tops</h3>
            </div>
          </a>
          <a href="/categories/bottoms" className="group">
            <div className="bg-gray-100 p-6 rounded-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold group-hover:text-blue-600">Bottoms</h3>
            </div>
          </a>
          <a href="/categories/accessories" className="group">
            <div className="bg-gray-100 p-6 rounded-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold group-hover:text-blue-600">Accessories</h3>
            </div>
          </a>
          <a href="/categories/new" className="group">
            <div className="bg-gray-100 p-6 rounded-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold group-hover:text-blue-600">New Arrivals</h3>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
} 