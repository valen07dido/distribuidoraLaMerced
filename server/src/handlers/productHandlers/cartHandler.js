const {
  getCartController,
  addCartController,
  updateCartItemController,
  removeFromCartController,
} = require("../../controllers/productControllers/cartController");
const getCartHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getCartController(id);
    if (response.error) {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const addCartHandler = async (req, res) => {
  const { productId, quantity } = req.body;
  const { id } = req.params;
  try {
    const response = await addCartController(productId, quantity, id);
    if (response.error) {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const updateCartHandler = async (req, res) => {
  const { productId, quantity } = req.body;
  const { id } = req.params;
  try {
    const response = await updateCartItemController(productId, quantity, id);
    if (response.error) {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const removeItemHandler = async (req, res) => {
  const { productId } = req.body;
  const { id } = req.params;

  try {
    const response = await removeFromCartController(productId, id);
    if (response.error) {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getCartHandler,
  addCartHandler,
  updateCartHandler,
  removeItemHandler,
};