import CategoryPage from '../../components/CategoryPage';

// This would typically come from your CMS or API
const accessoryProducts = [
  {
    id: '1',
    name: 'Beach Bag',
    price: 79.99,
    image: '/images/products/beach-bag.jpg',
    handle: 'beach-bag'
  },
  {
    id: '2',
    name: 'Summer Hat',
    price: 49.99,
    image: '/images/products/summer-hat.jpg',
    handle: 'summer-hat'
  },
  // Add more products as needed
];

export default function AccessoriesPage() {
  return (
    <CategoryPage
      title="Accessories Collection"
      description="Complete your beach look with our stylish accessories."
      products={accessoryProducts}
    />
  );
} 