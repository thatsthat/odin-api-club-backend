const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Handle Post create on POST.
exports.comment_create_post = [
  // Validate and sanitize fields.
  body("text", "Comment text must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Item object with escaped and trimmed data.
    const comment = new Comment({
      text: req.body.text,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      // Data from form is valid. Save item.
      await comment.save();
      return res.send("Comment saved!");
    }
  }),
];

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all Posts.
exports.comment_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post list");
});

// Display detail page for a specific Post.
exports.comment_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Post detail: ${req.params.id}`);
});

// Display Post create form on GET.
exports.comment_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post create GET");
});

// Display Post delete form on GET.
exports.comment_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post delete GET");
});

// Handle Post delete on POST.
exports.comment_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post delete POST");
});

// Display Post update form on GET.
exports.comment_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post update GET");
});

// Handle Post update on POST.
exports.comment_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Post update POST");
});
