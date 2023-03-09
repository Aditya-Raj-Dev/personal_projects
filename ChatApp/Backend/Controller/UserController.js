const UserModel = require("../Models/User.model");

const RegisterUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).send({ err: "Pleasae Enter All The Details" });
    throw new Error("Pleasae Enter All The Details");
  }
  const UserPresent = await UserModel.findOne({ email });

  if (UserPresent) {
    res.status(400);
    throw new Error("User Already exists");
  }

  const user = await UserModel.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).send({ msg: "Registration Successfully" });
  } else {
    res.status(400);
    throw new Error("Failed to create new User");
  }
};

const SearchUser = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $option: "i" } },
          { email: { $regex: req.query.search, $option: "i" } },
        ],
      }
    : {};

  const users = await UserModel.find(keyword).find({
    _id: { $ne: req.user._id },
  });  
  res.send(users);
};

module.exports = { RegisterUser, SearchUser };
