const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  like: Number,
  comment: [],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
