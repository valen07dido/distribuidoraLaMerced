const {
  Product,
  ProductImage,
  ProductStock,
  ProductCategory,
} = require("../../db");

const getProducts = async (id) => {
  if (id) {
    const product = await Product.findByPk(id);
    if(!product){
        return{
            error:true,
            response:"no existe producto con ese id"
        }
    }
    return product;
  } else {
    const products = await Product.findAll();
    if(!products || products.length ===0){
        return{
            error:true,
            response:"no hay productos creados"
        }
    }
    return products;
  }
};

module.exports = {
  getProducts,
};
