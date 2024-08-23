require("dotenv").config();
const database = process.env.DATABASE;

const { Sequelize } = require("sequelize");
//importar modelos
const UserModel = "./models/userModels/User.js";
const UserCredentialModel = "./models/userModels/UserCredentials.js";
const UserRoleModel = "./models/userModels/UserRole.js";

const ProductModel = "./models/productModels/Product.js";
const CartModel = "./models/productModels/Cart.js";
const WishlistModel = "./models/productModels/Wishlist.js";
const ProductCartModel = "./models/productModels/ProductCart.js";
const ProductImageModel = "./models/productModels/ProductImage.js";
const ProductStockModel = "./models/productModels/ProductStock.js";
// Inicializacion de la instancia de sequelize
const sequelize = new Sequelize(database, {
  logging: false,
  native: false,
});

//inicializar modelos

UserModel(sequelize);
UserCredentialModel(sequelize);
UserRoleModel(sequelize);
ProductModel(sequelize);
CartModel(sequelize);
WishlistModel(sequelize);
ProductCartModel(sequelize);
ProductImageModel(sequelize);
ProductStockModel(sequelize);
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  UserCredentials,
  UserRole,
  Cart,
  Product,
  ProductCart,
  ProductImage,
  ProductStock,
  Wishlist,
} = sequelize.models;
//relaciones entre modelos

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
