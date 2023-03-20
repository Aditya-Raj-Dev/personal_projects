const { ChatModel } = require("../Models/Chat.model");
const { MessageModel } = require("../Models/Message.mode");
const { UserModel } = require("../Models/User.model");

const SendMessage = async (req, res, next) => {
  const { content, chatId } = req.body;
    console.log(chatId) 
  if (!content || !chatId) {
    console.log("Invalid data passed");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await MessageModel.create(newMessage);
    message = await message.populate("sender", "name pic")
    message = await message.populate("chat")
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (e) {
    res.status(400);
    throw new Error(e.message);
  }
};

const Allmessages =async (req, res, next) => {
    try {
        const messages = await MessageModel.find({ chat: req.params.chatId })
          .populate("sender", "name pic email")
          .populate("chat");
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
};

module.exports = { SendMessage, Allmessages };
