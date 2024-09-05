const { User, Product, WishList } = require("../../db");

const wishlistController = async (userId, productId) => {
  try {
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return {
        error: true,
        response: "No se encontró un usuario",
      };
    }

    const existingProduct = await Product.findByPk(productId);
    if (!existingProduct) {
      return {
        error: true,
        response: "No se encontró producto",
      };
    }

    let wishlist = await WishList.findOne({ where: { userId } });

    if (!wishlist) {
      wishlist = await WishList.create({ userId });
    }

    const productInWishlist = await wishlist.hasProduct(existingProduct);

    if (productInWishlist) {
      await wishlist.removeProduct(existingProduct);
      return { response: "Producto eliminado de la wishlist" };
    } else {
      await wishlist.addProduct(existingProduct);
      return { response: "Producto añadido a la wishlist" };
    }
  } catch (error) {
    return {
      error: true,
      response: "Campo de producto no válido para actualizar.",
    };
  }
};

module.exports = {
  wishlistController,
};
