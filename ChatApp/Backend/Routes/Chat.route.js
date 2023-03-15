const {Router}=require("express");
const { accessChat, FetchChat, Creategroupchat, renameGroup, addtoGroup, removefromgroup } = require("../Controller/ChatController");

const ChatRoute=Router()

ChatRoute.post("/",accessChat);
ChatRoute.get("/",FetchChat) 
ChatRoute.post("/group",Creategroupchat) 
ChatRoute.patch("/rename",renameGroup)
 ChatRoute.patch("/groupremove",removefromgroup)
 ChatRoute.patch("/groupadd",addtoGroup)


module.exports={ChatRoute} 