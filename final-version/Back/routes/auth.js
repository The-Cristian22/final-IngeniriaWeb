
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', [
    check('username').notEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
], authController.register);

router.post('/login', [
    check('email').isEmail(),
    check('password').notEmpty()
], authController.login);

module.exports = router;
