const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors'); // Añadir CORS
require('dotenv').config();

// Importar rutas
const userRoutes = require('./routes/UserRoutes');

const app = express();

// Conexión a MongoDB
connectDB();

// Middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

// Configuración de rutas
app.use('/api/users', userRoutes);

// Ruta de prueba mejorada
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API Ecommerce funcionando',
    version: '1.0.0',
    documentation: '/api-docs' // Si implementas Swagger después
  });
});

// Manejo de errores mejorado
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // Solo en desarrollo
  });
});

const PORT = process.env.PORT || 4008;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🔗 Entorno: ${process.env.NODE_ENV || 'development'}`);
});