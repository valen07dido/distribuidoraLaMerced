const { User, Product, WishList } = require("../../db");

const wishlistController = async (userId, productId) => {
  try {
    // Buscar usuario por 'id'
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

    // Si la wishlist no existe, la creamos
    if (!wishlist) {
      wishlist = await WishList.create({ userId });
    }

    // Verificamos si el producto ya está en la wishlist
    const productInWishlist = await wishlist.hasProduct(existingProduct);

    if (productInWishlist) {
      // Si el producto ya está en la wishlist, lo eliminamos
      await wishlist.removeProduct(existingProduct);
      return { response: "Producto eliminado de la wishlist" };
    } else {
      // Si el producto no está en la wishlist, lo agregamos
      await wishlist.addProduct(existingProduct);
      return { response: "Producto añadido a la wishlist" };
    }
  } catch (error) {
    console.error("Error en wishlistController:", error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  wishlistController,
};
