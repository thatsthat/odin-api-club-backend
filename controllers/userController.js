const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  // Mock user
  const user = {
    id: 33,
    username: "iep",
    email: "iep@gmail.com",
  };

  jwt.sign({ user }, "iepiep", { expiresIn: "180s" }, (err, token) => {
    res.json({
      token,
    });
  });
};

// Verify Token
exports.obtainToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

// Handle Post create on POST.
exports.signup = [
  // Validate and sanitize fields.
  body("firstName", "Please provide a first name.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Please provide a last name.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Please provide a valid email address.")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .escape(),
  body("email").custom(async (value) => {
    if (value) {
      const user = await User.find({ email: value }).exec();

      if (user.length > 0) {
        throw new Error("Email address already in use");
      }
    }
  }),
  body("password", "Please provide a password.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      // Signup data is valid. Proceed with signup
      try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: true,
            isWriter: true,
          });
          const result = await user.save();
        });
      } catch (err) {
        return next(err);
      }
    }
  }),
];

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});
