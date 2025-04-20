import ProductList from '../components/products/ProductList';

const ProductsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Nuestros Productos</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;