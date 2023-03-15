const ChatModel = require("../Models/Chat.model");
const UserModel = require("../Models/User.model");

const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("please send Userid");
    return res.sendStatus(400);
  }
  var isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
   console.log(isChat)
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await ChatModel.create(chatData);

      const Fullchat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");
      res.status(200).send(Fullchat);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
};


const FetchChat= async(req,res)=>{
 try{
  ChatModel.find({users:{$elemMatch:{$eq:req.user._id}}})
  .populate("users","-password")
  .populate("groupAdmin","-password")
  .populate("latestMessage")
  .sort({updatedAt:-1})
  .then(async(result)=>{
   result=await UserModel.populate(result,{
      path:"latestMessage.sender",
      select:"name pic email"
   })
   res.status(200).send(result)
  })
 }
 catch(err){
res.status(400)
throw new Error(err.message)
 }
}


 

module.exports = { accessChat ,FetchChat};
