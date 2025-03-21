// models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

// Importar modelos
const Product = require('./product')(sequelize);
const User = require('./user')(sequelize);
const Order = require('./order')(sequelize);

// Relaciones (ejemplo: un usuario tiene muchos pedidos)
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    Product,
    User,
    Order
};
