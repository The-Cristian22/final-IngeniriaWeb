// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; // Asegúrate de que el puerto y dominio sean correctos

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data.products;
    } catch (error) {
        console.error("Error al obtener productos", error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data.token;
    } catch (error) {
        console.error("Error de autenticación", error);
        throw error;
    }
};

// Función para obtener el token CSRF
const getCsrfToken = async (token) => {
    const response = await axios.get(`${API_URL}/csrf-token`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    });
    return response.data.csrfToken;
};

export const addToCart = async (token, productId, quantity) => {
    try {
        const csrfToken = await getCsrfToken(token);
        const response = await axios.post(
            `${API_URL}/cart/add`,
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-CSRF-Token': csrfToken
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al agregar al carrito", error);
        throw error;
    }
};

// De forma similar, si implementas getCart o removeFromCart, deberás incluir el token CSRF
