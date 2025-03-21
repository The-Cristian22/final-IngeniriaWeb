
import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../services/api';
import ProductCard from './ProductCard';

const ProductList = ({ token, onCartUpdate }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error en fetchProducts:", error);
            }
        }
        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(token, productId, 1);
            alert('Producto agregado al carrito');
            onCartUpdate();
        } catch (error) {
            console.error("Error al agregar producto al carrito", error);
        }
    };

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                />
            ))}
        </div>
    );
};

export default ProductList;
