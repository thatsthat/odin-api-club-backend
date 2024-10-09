var express = require("express");
var router = express.Router();

// Require controller modules.
const article_controller = require("../controllers/articleController");
const comment_controller = require("../controllers/commentController");

// Utilizar url en vez de body en los endpoints que no sean post/patch/update
// */articles
// En las rutas privadas, poner middleware (para verificar token) antes del controlador
// Separar rutas publicas y privadas
// Intentar evitar mezclar partes estaticas y dinamicas en la misma posicion de la url
router.post("/", article_controller.article_create);

// List all public articles in the blog
router.get("/", article_controller.article_list);
// */users/:id/articles
router.get("/list", article_controller.user_articles_list);
// utilizar metodo 'patch' (parecido a put pero para act)
// */articles/:id
router.patch("/:articleId", article_controller.article_toggle_published);
// utilizar metodo 'delete' con mismo nombre
// utilizar ejemplo que John me ha mandado
router.delete("/:articleId", article_controller.article_delete);

// utilizar */articles/:id/comments para todas las operaciones
// utilizar */articles/comments/:id para operaciones de un comentario especifico

// Create new comment
router.post("/:articleId/comments", comment_controller.comment_create);

// Get all comments for a given article
router.get("/:articleId/comments", comment_controller.comment_list);

// Delete Comment
router.delete("/:articleId/comments", comment_controller.comment_delete);

module.exports = router;
