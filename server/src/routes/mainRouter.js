const { Router } = require("express");
const userRouter = require("./userRoutes/userRouter");
const sesionRouter = require("./userRoutes/sesionRouter");
const productRouter = require("./productRoutes/productRouter");
const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/sesion", sesionRouter);
mainRouter.use("/product", productRouter);

module.exports = mainRouter;
