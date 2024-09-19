const {
  Product,
  ProductImage,
  ProductStock,
  ProductCategory,
  ProductType,
} = require("../../db");

const createProduct = async ({
  name,
  description,
  categoryName,
  typeName,
  images,
  stock,
  ingredients,
  composition,
  feedingGuide
}) => {
  try {
    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      throw new Error("El producto ya existe");
    }

    const [category, created] = await ProductCategory.findOrCreate({
      where: { name: categoryName },
    });
    const [type] = await ProductType.findOrCreate({
      where: { name: typeName },
    });

    const newProduct = await Product.create({
      name,
      description,
      ingredients,
      composition,
      feedingGuide
    });

    await newProduct.addProductCategory(category);
    await newProduct.addProductType(type);

    if (images && images.length > 0) {
      const productImages = images.map((imageAddress) => ({
        address: imageAddress,
        ProductId: newProduct.id,
      }));
      await ProductImage.bulkCreate(productImages);
    }

    if (stock) {
      await ProductStock.create({
        amount: stock,
        ProductId: newProduct.id,
      });
    }

    return newProduct;
  } catch (error) {
    return {
      error: true,
      response: "algo fallo!",
    };
  }
};

module.exports = { createProduct };
