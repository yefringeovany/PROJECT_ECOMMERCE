const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La cantidad mínima es 1']
    }
  }],
  total: {
    type: Number,
    required: true,
    min: [0, 'El total no puede ser negativo']
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['paypal', 'credit_card', 'cash_on_delivery']
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Actualizar stock de productos cuando se crea un pedido
OrderSchema.pre('save', async function(next) {
  const Product = mongoose.model('Product');
  for (const item of this.products) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity }
    });
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);