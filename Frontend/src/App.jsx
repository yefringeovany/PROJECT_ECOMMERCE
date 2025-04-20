import { Outlet } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import { AuthProvider } from '../src/context/AuthContext';
import { ProductProvider } from '../src/context/ProductContext';

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Outlet />
          </main>
        </div>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
