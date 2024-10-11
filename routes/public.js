var express = require("express");
var router = express.Router();

const article_controller = require("../controllers/articleController");
const user_controller = require("../controllers/userController");
const comment_controller = require("../controllers/commentController");

router.get("/", article_controller.article_list);
router.post("/login", user_controller.login);
router.post("/signup", user_controller.signup);

router.get("/:articleId/comments", comment_controller.comment_list);

module.exports = router;
