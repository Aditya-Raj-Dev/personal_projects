const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User.model");

const Authentication = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await UserModel.findById(decode.id).select("-password");
      next();
    } catch (err) {
      res.status(400);
      throw new Error("Something Went Wrong");
    }
  }
  if (!token) {
    res.status(400);
    throw new Error("Not authorized");
  }
};

module.exports = { Authentication };
