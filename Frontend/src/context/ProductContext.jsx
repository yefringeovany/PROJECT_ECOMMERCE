import { createContext, useState } from 'react';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getFeaturedProducts
} from '../api/products';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      const { data } = await getProducts(params);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    try {
      setLoading(true);
      const product = await getProductById(id);
      return product;
    } catch (err) {
      setError(err.message || 'Error fetching product');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      setLoading(true);
      const newProduct = await createProduct(productData);
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message || 'Error creating product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProductById = async (id, productData) => {
    try {
      setLoading(true);
      const updatedProduct = await updateProduct(id, productData);
      setProducts(products.map(p => p._id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err.message || 'Error updating product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProductById = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      setError(err.message || 'Error deleting product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const featured = await getFeaturedProducts();
      setFeaturedProducts(featured);
    } catch (err) {
      setError(err.message || 'Error fetching featured products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      featuredProducts,
      loading,
      error,
      fetchProducts,
      fetchProductById,
      addProduct,
      updateProductById,
      deleteProductById,
      fetchFeaturedProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};