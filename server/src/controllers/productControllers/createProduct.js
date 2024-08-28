const {
  Product,
  ProductImage,
  ProductStock,
  ProductCategory,
} = require("../../db");

const createProduct = async ({
  name,
  description,
  categoryName,
  images,
  stock,
}) => {
  try {
    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      throw new Error("El producto ya existe");
    }

    const [category, created] = await ProductCategory.findOrCreate({
      where: { name: categoryName },
    });

    const newProduct = await Product.create({
      name,
      description,
    });

    await newProduct.addProductCategory(category);

    if (images && images.length > 0) {
      const productImages = images.map((imageUrl) => ({
        url: imageUrl,
        productId: newProduct.id,
      }));
      await ProductImage.bulkCreate(productImages);
    }

    if (stock) {
      await ProductStock.create({
        quantity: stock.quantity,
        productId: newProduct.id,
      });
    }

    return newProduct;
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    throw error;
  }
};

module.exports = { createProduct };
