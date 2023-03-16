const {ChatModel} = require("../Models/Chat.model");
const {UserModel }= require("../Models/User.model");

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
  console.log(isChat);
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

const FetchChat = async (req, res) => {
  try {
    ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await UserModel.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(result);
      });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
};

const Creategroupchat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "please Fill all the feilds" });
  }
  var users = req.body.users;
  console.log(users);
  if (users.length < 2) {
    res.status(400).send("More then 2 is required for a group");
  }

  users.push(req.user);
  try {
    const groupchat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullgroupchat = await ChatModel.findOne({ _id: groupchat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullgroupchat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updateChat = await ChatModel.findByIdAndUpdate(chatId,{chatName},
    { new: true}
  ).populate("users","-password")
  .populate("groupAdmin","-password")
  if(!updateChat){
    res.status(400)
    throw new Error("chat Not Found")
  }
  else{
    res.json(updateChat)
  }
};

const addtoGroup=async(req,res)=>{
  const { chatId, userId } = req.body;
const added=await ChatModel.findByIdAndUpdate(
  chatId,
  {
    $push:{users:userId},
  },
  {new:true}
).populate("users","-password")
.populate("groupAdmin","-password")
if(!added){
  res.status(400)
  throw new Error("chat Not Found")
}
else{
  res.json(added)
}
}

const removefromgroup=async(req,res)=>{
  const { chatId, userId } = req.body; 
  const removed=await ChatModel.findByIdAndUpdate(
    chatId,
    { 
      $pull:{users:userId},
    },
    {new:true}
  ).populate("users","-password")
  .populate("groupAdmin","-password")
  if(!removed){
    res.status(400)
    throw new Error("chat Not Found")
  }
  else{
    res.json(removed)
  }
}

module.exports = {removefromgroup, accessChat, FetchChat, Creategroupchat,renameGroup,addtoGroup };
