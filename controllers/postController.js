const Post = require("../models/postModel");

const createPost = (req, res, next) => {
  const { title, content } = req.body;
  if (title && content) {
    post = new Post({ title: title, content: content });
    post.save();
    return res.json("Post Created");
  } else {
    return res.json("Enter title and content");
  }
};

const allPosts = (req, res, next) => {
  Post.find().then((post) => {
    return res.json({ posts: post });
  });
};

const updatePost = (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (title && content && id) {
    Post.findById(id).then((post) => {
      if (!post) {
        return res.json("Post with title does not exists");
      } else {
        Post.updateOne({ id: id }, { title: title, content: content }).then(
          (data) => {
            console.log(data);
            return res.json("Update of post successful");
          }
        );
      }
    });
  } else {
    return res.json("Enter title and content and id");
  }
};

const deletePost = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.json("Enter id of post to delete");
  } else {
    Post.deleteOne({ id: id })
      .then((data) => {
        console.log(data);
        return res.json("Post Deleted");
      })
      .catch((err) => {
        console.log(err);
        return res.json("Error in deletion");
      });
  }
};

const likePost = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Post.findById(id).then((post) => {
    console.log(post);
    if (!post) {
      return res.json("Post does not exist");
    } else {
      Post.updateOne({ id: id }, { like: post.like ? post.like + 1 : 1 }).then(
        (result) => {
          console.log(result);
          return res.json("Post Liked");
        }
      );
    }
  });
};

const commentPost = (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;
  console.log(id);
  Post.findById(id).then((post) => {
    console.log(post);
    if (!post) {
      return res.json("Post does not exist");
    } else {
      Post.updateOne({ id: id }, { comment: [...post.comment, comment] }).then(
        (result) => {
          console.log(result);
          return res.json("Comment Created");
        }
      );
    }
  });
};
module.exports = { createPost, allPosts, deletePost, updatePost, likePost, commentPost };
