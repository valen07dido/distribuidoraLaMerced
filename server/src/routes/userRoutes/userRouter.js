const { Router } = require("express");
const {
  getUserhandler,
} = require("../../handlers/userHandlers/getUsersHandlers");
const useRouter = Router();

useRouter.get("/", getUserhandler);
useRouter.get("/:id", getUserhandler);

module.exports = useRouter;
