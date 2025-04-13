const express = require('express');
const connectDB = require('./config/database'); // Asegúrate de que la ruta sea correcta
require('dotenv').config();

const app = express();

// Middlewares esenciales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a DB antes de rutas
connectDB();

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    status: 'API Ecommerce operativa',
    db: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('⚠️ Error no capturado:', err.stack);
  res.status(500).send('Error interno del servidor');
});

const PORT = process.env.PORT || 4008;
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  
});

// Cierre elegante ante señales de terminación
process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close();
    console.log('🔴 Servidor y conexión a DB cerrados');
  });
});