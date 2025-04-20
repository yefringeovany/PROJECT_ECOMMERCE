import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:4008/api/users/login', {
        email,
        password
      });

      const { token } = res.data;
      setToken(token);
      localStorage.setItem('token', token); // Puedes usar esto para mantener sesión iniciada
      alert('Login exitoso');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError(err.response?.data?.msg || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary">Ingresar</button>
      </form>

      {token && (
        <div className="mt-3 alert alert-success">
          Token recibido: <br /> <code>{token}</code>
        </div>
      )}
    </div>
  );
};

export default Login;
