var express = require("express");
var router = express.Router();

// Require controller modules.
const article_controller = require("../controllers/articleController");
const comment_controller = require("../controllers/commentController");

router.post("/article", article_controller.article_create_post);
router.get("/article_list", article_controller.article_list);
router.get(
  "/user_articles_list/:userId",
  article_controller.user_articles_list
);
router.post(
  "/article_toggle_published",
  article_controller.article_toggle_published
);
router.post("/article_delete", article_controller.article_delete);

router.post("/comment", comment_controller.comment_create_post);

module.exports = router;
