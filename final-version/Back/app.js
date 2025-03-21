// app.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Asegúrate de configurar CORS según corresponda
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas públicas: autenticación sin protección CSRF
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Aplicar CSRF para el resto de las rutas
app.use(csurf({ cookie: true }));

// Endpoint para enviar el token CSRF al cliente
app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Sanitización (middleware personalizado)
const { sanitizeInputs } = require('./middlewares/sanitizeMiddleware');
app.use(sanitizeInputs);

// Rutas protegidas
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Middleware para manejo de errores
const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);

// Inicializar la base de datos y levantar el servidor
const { sequelize } = require('./models');

sequelize.sync({ force: false }).then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
}).catch(err => {
    console.error('Error al conectar con la base de datos:', err);
});
