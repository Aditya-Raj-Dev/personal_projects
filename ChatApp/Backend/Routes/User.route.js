const {Router}=require("express")
const { RegisterUser, SearchUser } = require("../Controller/UserController")

const UserRouter=Router()

UserRouter.post("/",RegisterUser)
UserRouter.get("/",SearchUser)

module.exports=UserRouter