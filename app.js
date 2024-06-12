require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
var bcrypt = require("bcryptjs");
var cors = require("cors");

var blogRouter = require("./routes/blog");
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
app.use(passport.session());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/blog", blogRouter);
app.use("/users", usersRouter);

module.exports = app;
