var express = require("express");
var router = express.Router();

// Require controller modules.
const article_controller = require("../controllers/articleController");
const comment_controller = require("../controllers/commentController");

// Utilizar url en vez de body en los endpoints que no sean post/patch/update
// */articles
// En las rutas privadas, poner middleware (para verificar token) antes del controlador
router.post("/article", article_controller.article_create_post);

// List all public articles in the blog
router.get("/article_list", article_controller.article_list);
// */users/:id/articles
router.get(
  "/user_articles_list/:userId",
  article_controller.user_articles_list
);
// utilizar metodo 'patch' (parecido a put pero para act)
// */articles/:id
router.post(
  "/article_toggle_published/:articleId",
  article_controller.article_toggle_published
);
// utilizar metodo 'delete' con mismo nombre
// utilizar ejemplo que John me ha mandado
router.post("/article_delete", article_controller.article_delete);

// utilizar */articles/:id/comments para todas las operaciones
// utilizar */articles/comments/:id para operaciones de un comentario especifico
router.post("/comment", comment_controller.comment_create_post);

module.exports = router;
