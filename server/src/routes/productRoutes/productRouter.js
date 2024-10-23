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
  getWishlistHandler,
} = require("../../handlers/productHandlers/WishlistHandler");

const { isAuthenticated } = require("../../middlewares/Authentication");
const {
  getCartHandler,
  addCartHandler,
  updateCartHandler,
  removeItemHandler,
  updateCartStateHandler,
  getAllCartsHandler,
} = require("../../handlers/productHandlers/cartHandler.js");
const multer = require("multer");
const { useInflection } = require("sequelize");
const upload = multer({ dest: "uploads/" });
const useRouter = Router();

useRouter.get("/", getProductHandler);
useRouter.get("/:id", getProductHandler);
useRouter.post(
  "/create",
  upload.array("images"),
  isAuthenticated,
  createProductHandler
);
useRouter.put("/update/:id", isAuthenticated, updateProductHandler);
useRouter.get("/cart/allcarts", isAuthenticated, getAllCartsHandler);
useRouter.post("/wishlist/:id", isAuthenticated, wishlistHandler);
useRouter.get("/wishlist/:id", isAuthenticated, getWishlistHandler);
useRouter.get("/cart/:id", isAuthenticated, getCartHandler);
useRouter.post("/cart/add/:id", isAuthenticated, addCartHandler);
useRouter.put("/cart/update/:id", isAuthenticated, updateCartHandler);
useRouter.delete("/cart/remove/:id", isAuthenticated, removeItemHandler);
useRouter.put(
  "/cart/update/state/:id",
  isAuthenticated,
  updateCartStateHandler
);

module.exports = useRouter;
