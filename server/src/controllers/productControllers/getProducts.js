const {
  Product,
  ProductImage,
  ProductStock,
  ProductCategory,
} = require("../../db");

const getProducts = async (id) => {
  if (id) {
    const product = await Product.findByPk(id);
    return product;
  } else {
    const products = await Product.findAll();
    return products;
  }
};

module.exports = {
  getProducts,
};
