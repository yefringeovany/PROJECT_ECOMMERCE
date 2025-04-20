import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../ui/Alert';
import Loader from '../ui/Loader';
import { useProducts } from '../../hooks/useProducts';

const categories = [
  'computadoras',
  'smartphones',
  'tablets',
  'accesorios',
  'audio',
  'smartwatch',
  'gaming',
  'otros'
];

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    loading, 
    error, 
    fetchProductById, 
    addProduct, 
    updateProductById 
  } = useProducts();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    discount: 0,
    category: '',
    brand: '',
    stock: 0,
    specifications: {},
    images: [],
    isFeatured: false
  });
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id) {
      const loadProduct = async () => {
        const product = await fetchProductById(id);
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          discount: product.discount || 0,
          category: product.category,
          brand: product.brand,
          stock: product.stock,
          specifications: product.specifications || {},
          images: product.images || [],
          isFeatured: product.isFeatured || false
        });
      };
      loadProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddSpec = () => {
    if (specKey && specValue) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specKey]: specValue
        }
      });
      setSpecKey('');
      setSpecValue('');
    }
  };

  const handleRemoveSpec = (key) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData({
      ...formData,
      specifications: newSpecs
    });
  };

  const handleAddImage = () => {
    if (imageUrl) {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl]
      });
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProductById(id, formData);
      } else {
        await addProduct(formData);
      }
      navigate(id ? `/admin/products` : '/admin/products');
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  if (loading && id) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Editar Producto' : 'Agregar Producto'}
      </h2>
      {error && <Alert message={error} type="error" />}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descuento (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              min="0"
              max="100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Marca</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              min="0"
              required
            />
          </div>
          
          <div className="mb-4 md:col-span-2">
            <label className="block text-gray-700 mb-2">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              rows="4"
              required
            ></textarea>
          </div>
          
          <div className="mb-4 md:col-span-2">
            <label className="block text-gray-700 mb-2">Especificaciones</label>
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="Clave"
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-l-lg"
              />
              <input
                type="text"
                placeholder="Valor"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                className="flex-1 px-3 py-2 border-t border-b"
              />
              <button
                type="button"
                onClick={handleAddSpec}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
              >
                Agregar
              </button>
            </div>
            
            <div className="space-y-2">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center bg-gray-100 p-2 rounded">
                  <span className="font-medium">{key}:</span>
                  <span className="ml-2 flex-1">{value}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(key)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4 md:col-span-2">
            <label className="block text-gray-700 mb-2">Imágenes</label>
            <div className="flex mb-2">
              <input
                type="text"
                placeholder="URL de la imagen"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-l-lg"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
              >
                Agregar
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Producto destacado</span>
            </label>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;