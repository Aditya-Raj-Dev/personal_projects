const {Router}=require("express")
const { SendMessage, Allmessages } = require("../Controller/MessageController")

const MessageRoute=Router()

MessageRoute.post("/",SendMessage)
MessageRoute.get("/:chatId",Allmessages)

module.exports={MessageRoute}