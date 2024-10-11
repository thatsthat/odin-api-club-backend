var express = require("express");
var router = express.Router();

// Require controller modules.
const article_controller = require("../controllers/articleController");
const comment_controller = require("../controllers/commentController");

router.get("/", article_controller.user_articles_list);
router.post("/", article_controller.article_create);
router.patch("/:articleId", article_controller.article_toggle_published);
router.delete("/:articleId", article_controller.article_delete);

router.get("/:articleId/comments", comment_controller.comment_list);
router.post("/:articleId/comments", comment_controller.comment_create);
router.delete("/:articleId/comments", comment_controller.comment_delete);

module.exports = router;
