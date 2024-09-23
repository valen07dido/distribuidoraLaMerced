const {
  Product,
  ProductImage,
  ProductStock,
  ProductCategory,
} = require("../../db");

const updateProductController = async (id, field, value) => {
  try {
    if (typeof id !== "string" && typeof id !== "number") {
      throw new Error("El ID proporcionado no es válido.");
    }

    const item = await Product.findByPk(id);
    if (!item) {
      throw new Error("No encontramos el producto a modificar.");
    }

    switch (field) {
      case "name":
        item.name = value;
        break;
      case "description":
        item.description = value;
        break;
      case "price":
        if (isNaN(value))
          return {
            error: true,
            response: "El precio debe ser un número.",
          };
        item.price = value;
        break;
      case "image": {
        if (!Array.isArray(value)) {
          return {
            error: true,
            response: "Mal formato de imagen.",
          };
        }

        await ProductImage.destroy({ where: { ProductId: id } });

        const imagePromises = value.map((imageUrl) =>
          ProductImage.create({ ProductId: id, address: imageUrl })
        );
        await Promise.all(imagePromises);

        return { message: "Imágenes actualizadas correctamente." };
      }
      case "stock": {
        const stock = await ProductStock.findOne({ where: { ProductId: id } });
        if (stock) {
          stock.amount = value;
          await stock.save();
        } else {
          await ProductStock.create({ ProductId: id, amount: value });
        }
        return { message: "Stock actualizado correctamente." };
      }
      case "category": {
        const category = await ProductCategory.findOne({
          where: { name: value },
        });

        if (!category) {
          const newCategory = await ProductCategory.create({ name: value });
          await item.addProductCategory(newCategory);
        } else {
          await item.addProductCategory(category);
        }
        return { message: "Categoría actualizada correctamente." };
      }
      case "ingredients":
        item.ingredients = value;
        break;
      case "composition":
        item.composition = value; // Asegúrate de que el modelo soporte la estructura de datos
        break;
      case "feedingGuide":
        item.feedingGuide = value; // Asegúrate de que el modelo soporte la estructura de datos
        break;
      default:
        return {
          error: true,
          response: "Campo de producto no válido para actualizar.",
        };
    }

    await item.save();

    return { message: "Producto actualizado correctamente", item };
  } catch (error) {
    return {
      error: true,
      response: `${error.message}. Error al actualizar el producto.`,
    };
  }
};

module.exports = {
  updateProductController,
};
