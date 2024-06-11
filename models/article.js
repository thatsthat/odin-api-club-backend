const mongoose = require("mongoose");

// a name, description, category, price, number-in-stock and URL

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, maxLength: 400 },
  //author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  //published: { type: Boolean },
  date: { type: Date, default: Date.now },
});

// Virtual for item's URL
ArticleSchema.virtual("rawText").get(function () {});

// Virtual for item's URL
ArticleSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/article/${this._id}`;
});

// Export model
module.exports = mongoose.model("Article", ArticleSchema);
