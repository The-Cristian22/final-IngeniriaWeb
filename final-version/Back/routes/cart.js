
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/add', verifyToken, cartController.addToCart);

router.post('/remove', verifyToken, cartController.removeFromCart);

router.get('/', verifyToken, cartController.getCart);

module.exports = router;
