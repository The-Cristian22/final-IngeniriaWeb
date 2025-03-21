// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Agregar producto al carrito
router.post('/add', verifyToken, cartController.addToCart);

// Eliminar producto del carrito
router.post('/remove', verifyToken, cartController.removeFromCart);

// Obtener carrito de compras
router.get('/', verifyToken, cartController.getCart);

module.exports = router;
