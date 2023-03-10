const {Router}=require("express")
const { RegisterUser, SearchUser, userLogin } = require("../Controller/UserController")

const UserRouter=Router()

UserRouter.post("/",RegisterUser)
UserRouter.post("/login",userLogin)
UserRouter.get("/",SearchUser)

module.exports=UserRouter