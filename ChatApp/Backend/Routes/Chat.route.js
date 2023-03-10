const {Router}=require("express");

const ChatRoute=Router()

ChatRoute.post("/",accessChat);
ChatRoute.get("/",fetchChat)
ChatRoute.post("/group",Creategroupchat)
ChatRoute.patch("/rename",renameGroup)
ChatRoute.patch("/groupremove",removefromgroup)
ChatRoute.patch("/groupadd",addtogroup)
