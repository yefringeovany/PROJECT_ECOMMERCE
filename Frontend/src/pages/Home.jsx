import { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/products/ProductList';
import HeroSection from '../components/layout/HeroSection';

const Home = () => {
  const { featuredProducts, fetchFeaturedProducts } = useProducts();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Productos Destacados</h2>
        <ProductList products={featuredProducts} />
      </div>
    </div>
  );
};

export default Home;