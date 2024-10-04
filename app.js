require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var cors = require("cors");
var articlesRouter = require("./routes/articles");
var usersRouter = require("./routes/users");

var app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);

const mongoDB =
  "mongodb+srv://" +
  process.env.CREDENTIALS +
  "/odin_blog_api?retryWrites=true&w=majority&appName=Odin";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/articles", articlesRouter);
app.use("/users", usersRouter);

module.exports = app;
