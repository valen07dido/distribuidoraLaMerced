const {
  createProduct,
} = require("../../controllers/productControllers/createProduct");

const createProductHandler = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await createProduct(product);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = {
  createProductHandler,
};
