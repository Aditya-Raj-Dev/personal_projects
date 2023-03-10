const UserModel = require("../Models/User.model");
const asyncHandler=require("express-async-handler")
const generateToken=require("../config/generateToken");
const { use } = require("../Routes/User.route");



const RegisterUser =asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400)
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
     throw new Error("Please Register First")
   }

  else if(user && user.password===password){
    const id=user._id
    res.send({"msg":"Login Successfully","token":generateToken(id)})
   }

   else if(user && user.password!==password){
    res.send({"msg":"Wrong Password"})
   }
   
})

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

module.exports = { RegisterUser, SearchUser,userLogin };
