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

exports.comment_delete = [
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
    await Comment.findByIdAndDelete(req.body.commentID);
    return res.send(JSON.stringify("comment deleted"));
  }),
];
