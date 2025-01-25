import { json } from "express"
import connectionDB from "./DB/connectionDB.js"
import userRouter from "./modules/user/user.controller.js"
import { globalErrorHandler } from "./utils/error/errorHandler.js"
import messageRouter from "./modules/message/message.controller.js"
import cors from "cors"

const bootstrap = (app,express)=>{
    //use  cors middleware
    app.use(cors())

    //use json middleware to parse incoming requests to JSON
    app.use(json())
    // home route
    app.get("/",(req,res,next)=>{
        return res.status(200).json({message:"Hello on saraha app ...."})
    })
    //use routes
    app.use("/users",userRouter)
    app.use("/messages",messageRouter)
    //database conection
    connectionDB()
    app.use("*",(req,res,next)=>{
        return next(new Error(`invalid URL ${req.originalUrl}`,{cause:400}))
    })
    app.use(globalErrorHandler)


}



export default bootstrap