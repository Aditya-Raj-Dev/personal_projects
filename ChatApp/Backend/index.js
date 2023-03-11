const express = require("express");
require("dotenv").config();
const { connection } = require("./database/db");
const UserRouter = require("./Routes/User.route");
const { chats } = require("./data/data");
const {NotFound}=require("./Middleware/ErrorMiddleware")
const cors=require("cors")
const app = express();

app.use(express.json());
app.use(cors())

 app.use("/user",UserRouter)

app.get("/", (req, res) => {
  res.json(chats);
});

app.get("/:id", (req, res) => {
    console.log(req.params)
    const singleChat=chats.find((p)=>p._id===req.params.id)
    res.send(singleChat)
  });




const PORT = process.env.PORTNO || 8000;
app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected", PORT);
  } catch (err) {
    console.log(err);
  }
});
