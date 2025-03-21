
let cart = {};

exports.addToCart = (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        if (!cart[userId]) {
            cart[userId] = [];
        }
        cart[userId].push({ productId, quantity });
        res.json({ message: 'Producto agregado al carrito', cart: cart[userId] });
    } catch (error) {
        next(error);
    }
};

exports.removeFromCart = (req, res, next) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;
        if (cart[userId]) {
            cart[userId] = cart[userId].filter(item => item.productId !== productId);
            res.json({ message: 'Producto eliminado del carrito', cart: cart[userId] });
        } else {
            res.status(400).json({ message: 'No hay carrito para este usuario' });
        }
    } catch (error) {
        next(error);
    }
};

exports.getCart = (req, res, next) => {
    try {
        const userId = req.user.id;
        res.json({ cart: cart[userId] || [] });
    } catch (error) {
        next(error);
    }
};
