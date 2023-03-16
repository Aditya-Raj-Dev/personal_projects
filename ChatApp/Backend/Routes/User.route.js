const {Router}=require("express")
const { RegisterUser, SearchUser, userLogin } = require("../Controller/UserController")
const { Authentication } = require("../Middleware/Authmiddleware")

const UserRouter=Router()

UserRouter.post("/signup",RegisterUser)
UserRouter.post("/login",userLogin)
UserRouter.get("/search",Authentication,SearchUser)

module.exports={UserRouter}