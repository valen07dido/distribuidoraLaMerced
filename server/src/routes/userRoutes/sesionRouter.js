const { Router } = require("express");
const { loginHandler } = require("../../handlers/userHandlers/loginHandler");
const { createUserHandler } = require("../../handlers/userHandlers/createUserHandler");

const useRouter = Router();

useRouter.post("/login", loginHandler);
useRouter.post("/register", createUserHandler);

module.exports = useRouter;
