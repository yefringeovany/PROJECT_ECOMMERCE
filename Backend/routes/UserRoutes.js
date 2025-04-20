const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/User_Controller');
const auth = require('../middlewware/auth');

// @route    POST api/users/register
// @desc     Register user
// @access   Public
router.post(
  '/register',
  [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'Por favor incluye un email válido').isEmail(),
    check('password', 'Por favor ingresa una contraseña con 6 o más caracteres').isLength({ min: 6 })
  ],
  userController.register
);

// @route    POST api/users/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Por favor incluye un email válido').isEmail(),
    check('password', 'La contraseña es requerida').exists()
  ],
  userController.login
);

// @route    GET api/users/me
// @desc     Get current user
// @access   Private
router.get('/me', auth.protect, userController.getMe);

// @route    GET api/users
// @desc     Get all users
// @access   Private/Admin
router.get('/', auth.protect, auth.authorize('admin'), userController.getUsers);

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Private/Admin
router.get('/:id', auth.protect, auth.authorize('admin'), userController.getUser);

// @route    PUT api/users/:id
// @desc     Update user
// @access   Private/Admin
router.put('/:id', auth.protect, auth.authorize('admin'), userController.updateUser);

// @route    DELETE api/users/:id
// @desc     Delete user
// @access   Private/Admin
router.delete('/:id', auth.protect, auth.authorize('admin'), userController.deleteUser);

module.exports = router;