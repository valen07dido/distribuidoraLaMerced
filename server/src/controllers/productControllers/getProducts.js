const {
  Product,
  ProductImage,
  ProductStock,
  ProductCategory,
} = require("../../db");

const getProducts = async (id) => {
  if (id) {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: ProductImage,
          attributes: ["address"], 
        },
        {
          model: ProductStock,
          attributes: ["amount"],
        },
        {
          model: ProductCategory,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!product) {
      return {
        error: true,
        response: "No existe producto con ese ID.",
      };
    }

    return product;
  } else {
    const products = await Product.findAll({
      include: [
        {
          model: ProductImage,
          attributes: ["address"],
        },
        {
          model: ProductStock,
          attributes: ["amount"],
        },
        {
          model: ProductCategory,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!products || products.length === 0) {
      return {
        error: true,
        response: "No hay productos creados.",
      };
    }

    return products;
  }
};

module.exports = {
  getProducts,
};
