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
} = require("../../handlers/productHandlers/wishlistHandler");
const { isAuthenticated } = require("../../middlewares/Authentication");

const useRouter = Router();

useRouter.get("/", getProductHandler);
useRouter.get("/:id", getProductHandler);
useRouter.post("/create", isAuthenticated, createProductHandler);
useRouter.put("/update/:id", updateProductHandler);
useRouter.post("/wishlist/:id", wishlistHandler);
module.exports = useRouter;
