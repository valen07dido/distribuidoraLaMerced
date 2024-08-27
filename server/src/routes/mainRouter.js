const {Router}=require("express")
const userRouter =require("./userRoutes/userRouter")
const mainRouter=Router()

mainRouter.use("/users",userRouter)


module.exports = mainRouter;
