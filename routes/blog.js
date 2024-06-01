var express = require("express");
var router = express.Router();

// Require controller modules.
const article_controller = require("../controllers/articleController");
const comment_controller = require("../controllers/commentController");

router.post("/article", article_controller.article_create_post);
router.get("/article_list", article_controller.article_list);

router.post("/comment", comment_controller.comment_create_post);

module.exports = router;
