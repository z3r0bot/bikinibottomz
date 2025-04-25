import CategoryPage from '../../components/CategoryPage';

// This would typically come from your CMS or API
const fashionProducts = [
  {
    id: '1',
    name: 'Summer Dress',
    price: 89.99,
    image: '/images/products/summer-dress.jpg',
    handle: 'summer-dress'
  },
  {
    id: '2',
    name: 'Beach Cover Up',
    price: 49.99,
    image: '/images/products/beach-cover-up.jpg',
    handle: 'beach-cover-up'
  },
  // Add more products as needed
];

export default function FashionPage() {
  return (
    <CategoryPage
      title="Fashion Collection"
      description="Discover our latest fashion collection, featuring trendy beachwear and summer essentials."
      products={fashionProducts}
    />
  );
} 