// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit: Iniciando login con", email, password);
        try {
            const token = await login(email, password);
            console.log("handleSubmit: Token recibido", token);
            if (token) {
                localStorage.setItem('token', token);
                onLogin(token);
                // Redirige a la ruta principal
                navigate('/');
            } else {
                console.error("handleSubmit: No se recibió token");
                setError("Error: No se recibió token. Verifica la respuesta del servidor.");
            }
        } catch (err) {
            console.error("handleSubmit: Error en el login", err);
            setError("Credenciales inválidas, verifica tu email y contraseña.");
        }
    };

    return (
        <div className="login-form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
