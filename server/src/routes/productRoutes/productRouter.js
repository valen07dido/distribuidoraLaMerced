const { Router } = require("express");
const {
  createProductHandler,
} = require("../../handlers/productHandlers/createProductHandler");
const {
  getProductHandler,
} = require("../../handlers/productHandlers/getProductHandler.js");
const {
  updateProductHandler,
} = require("../../handlers/productHandlers/updateProductHandler.js");
const {
  wishlistHandler,
} = require("../../handlers/productHandlers/WishlistHandler");

const { isAuthenticated } = require("../../middlewares/Authentication");
const {
  getCartHandler,
  addCartHandler,
  updateCartHandler,
  removeItemHandler,
} = require("../../handlers/productHandlers/cartHandler.js");

const useRouter = Router();

useRouter.get("/", getProductHandler);
useRouter.get("/:id", getProductHandler);
useRouter.post("/create", isAuthenticated, createProductHandler);
useRouter.put("/update/:id", updateProductHandler);
useRouter.post("/wishlist/:id", wishlistHandler);
useRouter.get("/cart/:id", getCartHandler);
useRouter.post("/cart/add/:id", addCartHandler);
useRouter.put("/cart/update/:id", updateCartHandler);
useRouter.delete("/cart/remove/:id", removeItemHandler);

module.exports = useRouter;
