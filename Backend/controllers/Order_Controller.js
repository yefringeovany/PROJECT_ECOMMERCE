const Order = require('../models/Order');

// @desc    Crear nueva orden
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod } = req.body;
    
    // Calcular total
    const total = products.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const order = new Order({
      user: req.user._id,
      products,
      total,
      shippingAddress,
      paymentMethod
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Obtener orden por ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'username email')
      .populate('products.product', 'name price');

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Obtener órdenes del usuario
// @route   GET /api/orders/myorders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders
};