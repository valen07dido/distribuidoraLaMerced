// controllers/productControllers/updateProductController.js
const {
  Product,
  ProductImage,
  ProductStock,
  ProductCategory,
} = require("../../db");

const updateProductController = async (id, field, value) => {
  try {
    console.log(`Field: ${field}, Value: ${value}, ID: ${id}`);

    // Verificar que el ID sea del tipo esperado
    if (typeof id !== "string" && typeof id !== "number") {
      throw new Error("El ID proporcionado no es válido.");
    }

    // Buscar el producto por su ID correctamente
    const item = await Product.findByPk(id);
    if (!item) {
      throw new Error("No encontramos el producto a modificar");
    }

    // Validar y actualizar el campo especificado
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
            response: "el precio debe ser numero",
          };
        item.price = value;
        break;
      case "image": {
        if (!Array.isArray(value)) {
          return {
            error: true,
            response: "Mal formato de imagen",
          };
        }

        // Eliminar todas las imágenes existentes asociadas al producto
        await ProductImage.destroy({ where: { ProductId: id } });

        // Crear nuevas imágenes
        const imagePromises = value.map((imageUrl) =>
          ProductImage.create({ ProductId: id, address: imageUrl })
        );
        await Promise.all(imagePromises);

        return { message: "Imágenes actualizadas correctamente" };
      }
      case "stock": {
        const stock = await ProductStock.findOne({ where: { ProductId: id } });
        if (stock) {
          stock.amount = value;
          await stock.save();
        } else {
          await ProductStock.create({ ProductId: id, amount: value });
        }
        return { message: "Stock actualizado correctamente" };
      }
      case "category": {
        //verificar categoria
        const category = await ProductCategory.findOne({ where: { name } });
        if (!category) {
          return {
            error: true,
            response: "Categoría no encontrada.",
          };
        }
        item.categoryId = value;
        break;
      }
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
      response: "Error al actualizar el producto",
    };
  }
};

module.exports = {
  updateProductController,
};
