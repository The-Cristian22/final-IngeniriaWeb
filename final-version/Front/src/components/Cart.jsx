// src/components/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ token, cartUpdate }) => {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/cart', {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setCart(response.data.cart);
        } catch (error) {
            console.error("Error al obtener el carrito", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token, cartUpdate]); // Se vuelve a ejecutar cuando cartUpdate cambia

    return (
        <div className="cart">
            <h2>Tu Carrito</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                cart.map((item, index) => (
                    <div key={index} className="cart-item">
                        <p>Producto: {item.productId}</p>
                        <p>Cantidad: {item.quantity}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
