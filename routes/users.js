var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");

router.post("/login", user_controller.login);
router.post("/signup", user_controller.signup);

module.exports = router;
