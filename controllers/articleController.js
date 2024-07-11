const Article = require("../models/article");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const userController = require("./userController");
const jwt = require("jsonwebtoken");

// Handle Post create on POST.
exports.article_create_post = [
  userController.obtainToken,
  (req, res, next) => {
    jwt.verify(req.token, "iepiep", (err, authData) => {
      if (err) {
        res.sendStatus(403);
        //res.send(authData);
      } else {
        /*         res.json({
          message: "Post created...",
          authData,
        }); */
        next();
      }
    });
  },
  // Validate and sanitize fields.
  body("title", "Post title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("text", "Post text must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    console.log(req.body.author);
    const errors = validationResult(req);

    // Create a Item object with escaped and trimmed data.
    const article = new Article({
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      isPublished: true,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      // Data from form is valid. Save item.
      await article.save();
      return res.send(article);
    }
  }),
];

exports.article_list = asyncHandler(async (req, res, next) => {
  const allArticles = await Article.find({}, "title text")
    .sort({ title: 1 })
    .populate("text")
    .exec();

  return res.send(allArticles);
});

exports.user_articles_list = [
  userController.obtainToken,
  (req, res, next) => {
    jwt.verify(req.token, "iepiep", (err, authData) => {
      if (err) {
        res.sendStatus(403);
        //res.send(authData);
      } else {
        /*         res.json({
          message: "Post created...",
          authData,
        }); */
        next();
      }
    });
  },
  asyncHandler(async (req, res, next) => {
    const userArticles = await Article.find(
      { author: req.body.userId },
      "title isPublished date"
    )
      .sort({ title: 1 })
      .exec();

    return res.send(userArticles);
  }),
];

exports.article_toggle_published = [
  userController.obtainToken,
  (req, res, next) => {
    jwt.verify(req.token, "iepiep", (err, authData) => {
      if (err) {
        res.sendStatus(403);
        //res.send(authData);
      } else {
        /*         res.json({
          message: "Post created...",
          authData,
        }); */
        next();
      }
    });
  },
  asyncHandler(async (req, res, next) => {
    let updatedArticle = req.body.article;
    //console.log(updatedArticle);
    updatedArticle.isPublished = !updatedArticle.isPublished;
    const savedArticle = await Article.findByIdAndUpdate(
      updatedArticle._id,
      updatedArticle,
      {}
    );
    return res.send(savedArticle);
  }),
];

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display detail page for a specific Post.
exports.article_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Post detail: ${req.params.id}`);
});

// Display Post create form on GET.
exports.article_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post create GET");
});

// Display Post delete form on GET.
exports.article_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post delete GET");
});

// Handle Post delete on POST.
exports.article_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post delete POST");
});

// Display Post update form on GET.
exports.article_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post update GET");
});

// Handle Post update on POST.
exports.article_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post update POST");
});
