import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx'; // Este es el correcto import
import Login from './components/auth/Login.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // carga el componente Home.jsx en la ruta raíz "/"
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
