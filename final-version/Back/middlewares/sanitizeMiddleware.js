// middlewares/sanitizeMiddleware.js
const { sanitizeBody } = require('express-validator');

exports.sanitizeInputs = (req, res, next) => {
    // Ejemplo simple: sanitizar todos los campos de req.body
    for (let key in req.body) {
        if (typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].trim();
        }
    }
    next();
};
