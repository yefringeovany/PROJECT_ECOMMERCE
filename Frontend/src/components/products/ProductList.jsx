import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductItem from './ProductItem';
import Loader from '../ui/Loader';
import Alert from '../ui/Alert';

const ProductList = ({ admin = false }) => {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div className="container mx-auto px-4 py-8">
      {admin && (
        <div className="mb-6">
          <Link
            to="/admin/products/new"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Agregar Producto
          </Link>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} admin={admin} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;