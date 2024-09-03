const {
  wishlistController,
} = require("../../controllers/productControllers/WishlistController");

const wishlistHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    const response = await wishlistController(id, productId);
    if (response.error) return res.status(404).json(response.response);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  wishlistHandler,
};
