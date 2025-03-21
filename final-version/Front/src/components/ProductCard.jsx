
import React from 'react';
import LazyImage from './LazyImage';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <LazyImage src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button onClick={() => onAddToCart(product.id)}>Agregar al carrito</button>
        </div>
    );
};

export default ProductCard;
