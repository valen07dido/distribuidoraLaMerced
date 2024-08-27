const {Router}=require("express")
const userRouter =require("./userRoutes/userRouter")
const sesionRouter=require("./userRoutes/sesionRouter")
const mainRouter=Router()

mainRouter.use("/users",userRouter)
mainRouter.use("/sesion",sesionRouter)

module.exports = mainRouter;
