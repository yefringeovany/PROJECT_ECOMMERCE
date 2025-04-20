const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    maxlength: [1000, 'La descripción no puede exceder los 1000 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo'],
    max: [1000000, 'El precio no puede exceder 1,000,000']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'El descuento no puede ser negativo'],
    max: [100, 'El descuento no puede exceder el 100%']
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  sold: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: {
      values: [
        'computadoras',
        'smartphones',
        'tablets',
        'accesorios',
        'audio',
        'smartwatch',
        'gaming',
        'otros'
      ],
      message: 'Categoría no válida'
    }
  },
  brand: {
    type: String,
    required: [true, 'La marca es obligatoria'],
    maxlength: [50, 'La marca no puede exceder los 50 caracteres']
  },
  specifications: {
    type: Map,
    of: String
  },
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Debe haber al menos una imagen'
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'El rating no puede ser menor que 0'],
      max: [5, 'El rating no puede ser mayor que 5']
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Actualizar la fecha de modificación antes de guardar
ProductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Método para aplicar descuento
ProductSchema.methods.getDiscountedPrice = function() {
  return this.price * (1 - this.discount / 100);
};

module.exports = mongoose.model('Product', ProductSchema);