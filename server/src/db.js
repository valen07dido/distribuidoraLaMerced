require("dotenv").config();
const database = process.env.DATABASE;

const { Sequelize } = require("sequelize");
// Importar modelos
const UserModel = require("./models/userModels/User");
const UserCredentialModel = require("./models/userModels/UserCredential");
const UserRoleModel = require("./models/userModels/UserRole");

const ProductModel = require("./models/productModels/Product");
const CartModel = require("./models/productModels/Cart");
const WishlistModel = require("./models/productModels/Wishlist");
const ProductCartModel = require("./models/productModels/ProductCart");
const ProductImageModel = require("./models/productModels/ProductImage");
const ProductStockModel = require("./models/productModels/ProductStock");
const ProductCategoryModel = require("./models/productModels/ProductCategory");

// Inicialización de Sequelize
const sequelize = new Sequelize(database, {
  logging: false,
  native: false,
});

// Inicializar modelos
const User = UserModel(sequelize);
const UserCredentials = UserCredentialModel(sequelize);
const UserRole = UserRoleModel(sequelize);
const Product = ProductModel(sequelize);
const Cart = CartModel(sequelize);
const Wishlist = WishlistModel(sequelize);
const ProductCart = ProductCartModel(sequelize);
const ProductImage = ProductImageModel(sequelize);
const ProductStock = ProductStockModel(sequelize);
const ProductCategory = ProductCategoryModel(sequelize);

// Definir relaciones entre modelos
User.hasOne(UserCredentials, { onDelete: "CASCADE" });
UserCredentials.belongsTo(User);

User.belongsTo(UserRole, { foreignKey: "rolId", as: "role" });

Product.belongsToMany(ProductCategory, { through: "ProductProductCategory" });
ProductCategory.belongsToMany(Product, { through: "ProductProductCategory" });

Product.hasMany(ProductImage, { onDelete: "CASCADE" });
ProductImage.belongsTo(Product);

Product.hasOne(ProductStock, { onDelete: "CASCADE" });
ProductStock.belongsTo(Product);

User.hasOne(Wishlist);
Wishlist.belongsTo(User);
Wishlist.belongsToMany(Product, { through: "WishlistProduct" });
Product.belongsToMany(Wishlist, { through: "WishlistProduct" });

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsToMany(Product, { through: "ProductCart" });
Product.belongsToMany(Cart, { through: "ProductCart" });

// Exportar modelos y conexión
module.exports = {
  ...sequelize.models, // para importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
