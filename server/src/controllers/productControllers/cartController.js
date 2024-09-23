const { Cart, Product, ProductCart, User } = require("../../db");

const getCartController = async (UserId) => {
  const cart = await Cart.findOne({
    where: { UserId },
    include: {
      model: Product,
      through: {
        model: ProductCart,
        attributes: ["quantity"],
      },
    },
  });

  if (!cart) return { error: true, response: "Carrito no encontrado" };

  return cart;
};

const addCartController = async (productId, quantity, UserId) => {
  let cart = await Cart.findOne({ where: { UserId } });
  if (!cart) {
    cart = await Cart.create({ UserId, state: "inicializado" });
  }
  const product = await Product.findByPk(productId);
  if (!product) return { error: true, response: "Producto no encontrado" };
  const [productCart, created] = await ProductCart.findOrCreate({
    where: { CartId: cart.id, ProductId: productId },
    defaults: { quantity },
  });
  if (!created) {
    productCart.quantity += quantity;
    await productCart.save();
  }
  return cart;
};

const updateCartItemController = async (productId, quantity, UserId) => {
  const cart = await Cart.findOne({ where: { UserId } });
  if (!cart) return { error: true, response: "Carrito no encontrado" };
  const productCart = await ProductCart.findOne({
    where: { CartId: cart.id, ProductId: productId },
  });
  if (!productCart) return { error: true, response: "Producto no encontrado" };
  productCart.quantity = quantity;
  await productCart.save();

  return productCart;
};

const removeFromCartController = async (productId, UserId) => {
  const cart = await Cart.findOne({ where: { UserId } });
  if (!cart) return { error: true, response: "Carrito no encontrado" };
  const productCart = await ProductCart.findOne({
    where: { CartId: cart.id, ProductId: productId },
  });
  if (!productCart) return { error: true, response: "Producto no encontrado" };
  await productCart.destroy();
  return {
    delete: true,
    response: "Producto eliminado del carrito correctamente",
  };
};

module.exports = {
  getCartController,
  addCartController,
  updateCartItemController,
  removeFromCartController,
};
