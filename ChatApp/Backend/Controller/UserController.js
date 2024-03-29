const {UserModel} = require("../Models/User.model");
const asyncHandler=require("express-async-handler")
const {generateToken}=require("../config/generateToken");
const { use } = require("../Routes/User.route");



const RegisterUser =asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).send("Pleasae Enter All The Details")
    throw new Error("Pleasae Enter All The Details");
  }
  const UserPresent = await UserModel.findOne({ email });

  if (UserPresent) {
    res.status(500).send("User Already exists")
    throw new Error("User Already exists");
  }

  const user = await UserModel.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    const id=user._id
    res.status(201).send({ msg: "Registration Successfully",token:generateToken(id),data:user });
  } else {
    res.status(400);
    throw new Error("Failed to create new User");
  }
});


const userLogin=asyncHandler(async(req,res)=>{
   const {email,password}=req.body;
   const user=await UserModel.findOne({email});
   if(!user){
    res.status(400).send("Please Register First")
     throw new Error("Please Register First")
   }

  else if(user && user.password===password){
    const id=user._id
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
   }

   else if(user && user.password!==password){
    res.status(400).send("Wrong Password")
     throw new Error("Wrong Password")
   }
   
})

const SearchUser =asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await UserModel.find(keyword).find({
    _id: { $ne: req.user._id },
  }).select("-password")
  res.send(users);
});

module.exports = { RegisterUser, SearchUser,userLogin };
