
const { Product } = require('../models');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json({ products });
    } catch (error) {
        next(error);
    }
};
