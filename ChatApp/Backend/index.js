const express=require("express");
require("dotenv").config()
const {connection}= require("./database/db");
const UserRouter = require("./Routes/User.route");


const app=express();

app.use(express.json())

app.use("/user",UserRouter)

app.get("/",(req,res)=>{
    res.send("welc")
})


const PORT=process.env.PORTNO || 8000;
app.listen(8080,async()=>{
    try{
      await connection
        console.log("connected",PORT)
    }
    catch(err){
        console.log(err)
    }
   
})

