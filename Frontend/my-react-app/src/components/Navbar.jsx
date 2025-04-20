import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">Ecommerce</Link>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-primary me-2" to="/login">
                  Iniciar Sesión
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-success" to="/register">
                  Registrarse
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button
                className="nav-link btn btn-outline-danger me-2"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/';
                }}
              >
                Cerrar Sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
