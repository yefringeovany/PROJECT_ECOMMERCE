const jwt = require('jsonwebtoken');
const User = require('../models/Users');

// Middleware para proteger rutas
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ msg: 'No autorizado, token no proporcionado' });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.user.id).select('-password');

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'No autorizado, token fallido' });
  }
};

// Middleware para autorizar roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        msg: `El rol ${req.user.role} no tiene acceso a esta ruta` 
      });
    }
    next();
  };
};