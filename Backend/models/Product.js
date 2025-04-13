const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'clothing', 'food', 'books']
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  image: {
    type: String,
    default: 'no-image.jpg'
  },
  ratings: {
    type: Number,
    default: 0,
    min: [0, 'El rating mínimo es 0'],
    max: [5, 'El rating máximo es 5']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Índice para búsquedas rápidas
ProductSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);