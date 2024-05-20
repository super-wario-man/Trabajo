const { Sequelize, Model, DataTypes } = require("sequelize");
require('dotenv').config({ path: 'C:\\Users\\black\\OneDrive\\Escritorio\\api-sequelize\\src\\model\\.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT 
});

class Product extends Model {}

Product.init({
  product_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
  },
  is_stock: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize,
  modelName: 'Product',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("¡Conexión establecida con éxito!");
  } catch (err) {
    console.error("¡Error al conectar con la base de datos!", err);
  }
}

async function syncModel() {
  try {
    await Product.sync({ alter: true });
    console.log("¡Modelo sincronizado con éxito!");
  } catch (err) {
    console.error("¡Error al sincronizar el modelo!", err);
  }
}

testConnection();
syncModel();

module.exports = { sequelize, Product };
