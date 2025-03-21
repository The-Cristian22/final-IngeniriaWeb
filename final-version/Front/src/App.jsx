// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/main.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    // Estado para forzar el refresco del carrito
    const [cartUpdate, setCartUpdate] = useState(0);

    // Función para actualizar el carrito
    const handleCartUpdate = () => {
        setCartUpdate(prev => prev + 1);
    };

    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    {/* Ruta pública de login */}
                    <Route path="/login" element={<Login onLogin={setToken} />} />
                    {/* Rutas protegidas */}
                    <Route element={<ProtectedRoute token={token} />}>
                        <Route
                            path="/"
                            element={<ProductList token={token} onCartUpdate={handleCartUpdate} />}
                        />
                        <Route
                            path="/cart"
                            element={<Cart token={token} cartUpdate={cartUpdate} />}
                        />
                    </Route>
                    {/* Redireccionar a login para cualquier otra ruta */}
                    <Route path="*" element={<Login onLogin={setToken} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
