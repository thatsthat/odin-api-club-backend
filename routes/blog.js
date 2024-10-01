var express = require("express");
var router = express.Router();

// Require controller modules.
const article_controller = require("../controllers/articleController");
const comment_controller = require("../controllers/commentController");

/* Article api calls */

// Create article
router.post("/article", article_controller.article_create_post);

// List all public articles in the blog
router.get("/article_list", article_controller.article_list);

// List of articles belonging to a given user
router.get(
  "/user_articles_list/:userId",
  article_controller.user_articles_list
);

// Change 'published' status of an article
router.post(
  "/article_toggle_published/:articleId",
  article_controller.article_toggle_published
);

// Delete a specific article
router.post("/article_delete", article_controller.article_delete);

/* Comment api calls */

// Create a comment
router.post("/comment", comment_controller.comment_create_post);

module.exports = router;
