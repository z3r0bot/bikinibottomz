import CategoryPage from '@/components/CategoryPage';

// This would typically come from your CMS or API
const crystalProducts = [
  {
    id: '1',
    name: 'Crystal Necklace',
    price: 79.99,
    image: '/images/products/crystal-necklace.jpg',
    handle: 'crystal-necklace'
  },
  {
    id: '2',
    name: 'Healing Crystal Set',
    price: 129.99,
    image: '/images/products/crystal-set.jpg',
    handle: 'healing-crystal-set'
  },
  // Add more products as needed
];

export default function CrystalsPage() {
  return (
    <CategoryPage
      title="Crystal Collection"
      description="Explore our collection of healing crystals and crystal jewelry."
      products={crystalProducts}
    />
  );
} 