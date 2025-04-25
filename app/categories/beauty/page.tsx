import CategoryPage from '../../components/CategoryPage';

// This would typically come from your CMS or API
const beautyProducts = [
  {
    id: '1',
    name: 'Ocean Breeze Face Cream',
    price: 29.99,
    image: '/images/products/face-cream.jpg',
    handle: 'ocean-breeze-face-cream'
  },
  {
    id: '2',
    name: 'Seaweed Hair Mask',
    price: 24.99,
    image: '/images/products/hair-mask.jpg',
    handle: 'seaweed-hair-mask'
  },
  // Add more products as needed
];

export default function BeautyPage() {
  return (
    <CategoryPage
      title="Beauty Collection"
      description="Discover our natural beauty products inspired by the ocean."
      products={beautyProducts}
    />
  );
} 