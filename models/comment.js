const mongoose = require("mongoose");

// a name, description, category, price, number-in-stock and URL

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, maxLength: 400 },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  article: { type: Schema.Types.ObjectId, ref: "Article", required: true }, // reference to the belonging article
  date: { type: Date, default: Date.now },
  // Opcional comentario de comentario (campo extra con 'parent comment')
});

// Virtual for item's URL
CommentSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/comment/${this._id}`;
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
