const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
app.use(
  require("cors")({ credentials: true, origin: "http://localhost:3000" })
);

const jwt = require("jsonwebtoken");
const path = require("path");
const salt = bcrypt.genSaltSync(10);
const secret = "abcdefghijk";
app.use("/uploads", express.static(__dirname + "/uploads"));

const initialDbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ak749258:TYfRGt43wQ63HzFR@cluster0.egk2tl7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("db connected");
  } catch (error) {
    console.error(error);
  }
};
initialDbConnection();
app.use(cookieParser());
app.use(express.json());
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.create({
    username,
    password: bcrypt.hashSync(password, salt),
  });
  res.json(userDoc);
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passok = bcrypt.compareSync(password, userDoc.password);
  if (passok) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(404).json("Wrong Credentials");
  }
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  //console.log(token);
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  //res.json(req.cookies);
});
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });

  res.json(postDoc);
});

app.get("/post", async (req, res) => {
  const post = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 });
  res.json(post);
});
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});
app.listen(4000, () => {
  console.log("App running on Port 4000");
});
//mongodb+srv://ak749258:12345678@cluster0.egk2tl7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
