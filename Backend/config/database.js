const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
      socketTimeoutMS: 45000 // Cierra conexiones inactivas después de 45s
    });
    
    console.log('Conectado a MongoDB Atlas | DB:', mongoose.connection.name);
    
    // Eventos de conexión para manejar errores post-conexión
    mongoose.connection.on('error', (err) => {
      console.error(' Error post-conexión:', err);
    });

  } catch (err) {
    console.error(' Error de conexión inicial:', err.message);
    process.exit(1); // Fuerza la salida en caso de error crítico
  }
};

module.exports = connectDB;