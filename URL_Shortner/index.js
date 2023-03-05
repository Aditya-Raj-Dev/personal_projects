const express=require("express")
const  shortid = require('shortid');
const urlmodel = require("./model/url.mode");
const mongoose=require("mongoose")

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
res.send("welcome")
})

app.post("/",async(req,res)=>{
    if(!req.body.url) return res.status(400).send({"msg":"url is required"})
  const shortUrl=shortid()
  await urlmodel.create({
    shortUrl,
    redirecturl:req.body.url,
    visitHistory:[]
  });
res.send({"msg":shortUrl})
})

app.get("/:shortid",async(req,res)=>{
    const shortUrl=req.params.shortid;
    console.log()
  const entry=  await urlmodel.findOneAndUpdate({
   shortUrl
    },{$push:{
        visitHistory:{time:Date.now()}
    }})
    console.log(entry)
    res.redirect(entry.redirecturl)
})
 
app.listen(9000,async ()=>{
await mongoose.connect("mongodb+srv://adi:123@cluster0.s2zqiy6.mongodb.net/test")
    console.log("server started")
})