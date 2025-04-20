import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';
import Alert from '../ui/Alert';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { token } = await register(formData);
      const user = await getMe();
      authLogin(token, user);
      navigate('/');
    } catch (err) {
      setError(err.msg || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
      {error && <Alert message={error} type="error" />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={handleChange}
            required
            minLength="3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default Register;