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

    // Encontrar o crear la categoría del producto
    const [category, created] = await ProductCategory.findOrCreate({
      where: { name: categoryName },
    });

    // Crear el nuevo producto
    const newProduct = await Product.create({
      name,
      description,
    });

    // Asignar la categoría al producto
    await newProduct.addProductCategory(category);

    // Añadir imágenes del producto
    if (images && images.length > 0) {
      const productImages = images.map((imageAddress) => ({
        address: imageAddress,
        ProductId: newProduct.id, 
      }));
      await ProductImage.bulkCreate(productImages);
    }

    // Añadir stock del producto
    if (stock) {
      await ProductStock.create({
        amount: stock, 
        ProductId: newProduct.id, 
      });
    }

    return newProduct;
  } catch (error) {
    return{
      error:true,
      response:"algo fallo!"
  }
  }
};

module.exports = { createProduct };
