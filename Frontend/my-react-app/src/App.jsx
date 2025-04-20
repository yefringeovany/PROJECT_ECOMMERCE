import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Products from '../src/pages/Products';
import Navbar from '../src/components/Navbar'; // 

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar visible en todas las páginas */}

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
