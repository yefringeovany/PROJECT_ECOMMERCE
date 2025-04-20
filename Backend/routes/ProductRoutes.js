const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const productController = require('../controllers/Product_Controller');
const auth = require('../middlewware/auth');

// @route    POST api/products
// @desc     Crear un producto
// @access   Private/Admin
router.post(
  '/',
  [
    auth.protect,
    auth.authorize('admin'),
    [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('description', 'La descripción es obligatoria').not().isEmpty(),
      check('price', 'El precio es obligatorio y debe ser un número').isNumeric(),
      check('category', 'Categoría no válida').isIn([
        'computadoras',
        'smartphones',
        'tablets',
        'accesorios',
        'audio',
        'smartwatch',
        'gaming',
        'otros'
      ]),
      check('brand', 'La marca es obligatoria').not().isEmpty()
    ]
  ],
  productController.createProduct
);

// @route    GET api/products
// @desc     Obtener todos los productos
// @access   Public
router.get('/', productController.getProducts);

// @route    GET api/products/:id
// @desc     Obtener un producto por ID
// @access   Public
router.get('/:id', productController.getProduct);

// @route    PUT api/products/:id
// @desc     Actualizar un producto
// @access   Private/Admin
router.put(
  '/:id',
  [
    auth.protect,
    auth.authorize('admin'),
    [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('price', 'El precio es obligatorio y debe ser un número').isNumeric()
    ]
  ],
  productController.updateProduct
);

// @route    DELETE api/products/:id
// @desc     Eliminar un producto
// @access   Private/Admin
router.delete('/:id', [auth.protect, auth.authorize('admin')], productController.deleteProduct);

// @route    GET api/products/featured
// @desc     Obtener productos destacados
// @access   Public
router.get('/featured', productController.getFeaturedProducts);

// @route    PUT api/products/:id/stock
// @desc     Actualizar el stock
// @access   Private/Admin
router.put(
  '/:id/stock',
  [
    auth.protect,
    auth.authorize('admin'),
    [check('quantity', 'La cantidad es obligatoria y debe ser un número').isNumeric()]
  ],
  productController.updateStock
);

module.exports = router;