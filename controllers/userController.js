const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

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

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});
