var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");

router.get("/login", user_controller.login);

module.exports = router;
