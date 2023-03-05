const mongoose =require("mongoose")

const UrlSchema=mongoose.Schema({
    redirecturl:{type:String,required:true},
    shortUrl:{type:String,required:true,unique:true},
    visitHistory:[{time:{type:Number}}]
},{timestamp:true})

const urlmodel=mongoose.model("url",UrlSchema)

module.exports=urlmodel