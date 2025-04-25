import CategoryPage from '@/components/CategoryPage';

// This would typically come from your CMS or API
const summerProducts = [
  {
    id: '1',
    name: 'Beach Umbrella',
    price: 59.99,
    image: '/images/products/beach-umbrella.jpg',
    handle: 'beach-umbrella'
  },
  {
    id: '2',
    name: 'Beach Towel Set',
    price: 39.99,
    image: '/images/products/beach-towel-set.jpg',
    handle: 'beach-towel-set'
  },
  // Add more products as needed
];

export default function SummerPage() {
  return (
    <CategoryPage
      title="Summer Collection"
      description="Everything you need for a perfect day at the beach."
      products={summerProducts}
    />
  );
} 