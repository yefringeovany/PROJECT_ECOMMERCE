import { Link } from 'react-router-dom';

const ProductItem = ({ product, admin }) => {
  const discountedPrice = product.price * (1 - (product.discount / 100));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={product.images[0] || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          {product.discount > 0 && (
            <span className="text-gray-500 line-through mr-2">${product.price.toFixed(2)}</span>
          )}
          <span className="text-blue-600 font-bold">${discountedPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">{product.category}</p>
        
        <div className="flex justify-between">
          <Link
            to={`/products/${product._id}`}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Ver Detalles
          </Link>
          
          {admin && (
            <div className="space-x-2">
              <Link
                to={`/admin/products/edit/${product._id}`}
                className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
              >
                Editar
              </Link>
              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;