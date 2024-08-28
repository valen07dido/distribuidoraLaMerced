const { Router } = require("express");
const {
  createProductHandler,
} = require("../../handlers/productHandlers/createProductHandler");

const useRouter = Router();

useRouter.post("/create", createProductHandler);

module.exports = useRouter;
