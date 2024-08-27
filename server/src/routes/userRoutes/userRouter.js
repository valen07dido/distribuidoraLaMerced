const { Router } = require("express");
const {
  getUserhandler,
} = require("../../handlers/userHandlers/getUsersHandlers");
const useRouter = Router();

useRouter.get("/", getUserhandler);

module.exports = useRouter;
