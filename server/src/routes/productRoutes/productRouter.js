const { Router } = require("express");
const {
  createProductHandler,
} = require("../../handlers/productHandlers/createProductHandler");
const {
  getProductHandler,
} = require("../../handlers/productHandlers/getProductHandler.js");
const { isAuthenticated } = require("../../middlewares/Authentication");


const useRouter = Router();

useRouter.get("/", getProductHandler);
useRouter.get("/:id", getProductHandler);
useRouter.post("/create", isAuthenticated ,createProductHandler);

module.exports = useRouter;
