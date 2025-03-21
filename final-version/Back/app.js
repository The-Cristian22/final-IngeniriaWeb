
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();

app.use(helmet());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.use(csurf({ cookie: true }));

app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

const { sanitizeInputs } = require('./middlewares/sanitizeMiddleware');
app.use(sanitizeInputs);

const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);

const { sequelize } = require('./models');

sequelize.sync({ force: false }).then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
}).catch(err => {
    console.error('Error al conectar con la base de datos:', err);
});
