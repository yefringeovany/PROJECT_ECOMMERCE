import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ProductsPage from '../pages/ProductsPage';
import ProductDetail from '../pages/ProductDetail';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminProductsPage from '../pages/AdminProductsPage';
import AdminProductForm from '../pages/AdminProductForm';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'admin/products', element: <AdminProductsPage /> },
      { path: 'admin/products/new', element: <AdminProductForm /> },
      { path: 'admin/products/edit/:id', element: <AdminProductForm /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

export default router;