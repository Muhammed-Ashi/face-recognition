const express = require ("express")
const app = express()

const userRouter = require("./Router/userRouter")
const imageRouter = require("./Router/imageRouter")
const cors  = require("cors")


  //console.log(postgress.select("*").from("users"))
  
  app.use(express.json())
  app.use(cors()) 
 app.use("/api/user",userRouter)
 app.use("/api/image",imageRouter) 


app.listen(5000,()=> {
    console.log("server has started successfully ")
}) 