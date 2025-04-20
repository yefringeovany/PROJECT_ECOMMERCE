import React, { useEffect, useState } from 'react';
import { getProducts } from '../../src/api/productApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log('Products fetched:', response); // Imprimir la respuesta completa para verificar
        setProducts(response.data);  // Asegúrate de acceder a 'data', no a todo el objeto
      } catch (err) {
        setError('Error fetching products: ' + err.message);
        console.error('Error fetching products:', err);  // Muestra el error en consola
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2>Products</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <div className="card">
                <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
