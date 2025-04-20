import { PrivateRoute } from '../components/layout/PrivateRoute';
import ProductList from '../components/products/ProductList';

const AdminProductsPage = () => {
  return (
    <PrivateRoute roles={['admin']}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Administrar Productos</h1>
        <ProductList admin={true} />
      </div>
    </PrivateRoute>
  );
};

export default AdminProductsPage;