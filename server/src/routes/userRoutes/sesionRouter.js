const { Router } = require("express");
const { loginHandler } = require("../../handlers/userHandlers/loginHandler");
const {createUserHandler}=require("../../handlers/userHandlers/createUserHandler")
const useRouter = Router();

useRouter.post('/login', loginHandler);  // Ruta para iniciar sesión
// useRouter.post("/signin", signInHandler); // Ruta para registrar (puedes tener un handler diferente para esto)
useRouter.post("/register",createUserHandler)

module.exports = useRouter;
