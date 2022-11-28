const express = require("express");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const route = express.Router();

// route.get("/login");
route.post("/login", userController.loginUser);
route.post("/create", userController.createUser);
route.post("/forgot-password", userController.forgotPassword);
route.get("/posts", postController.allPosts);
route.post("/posts", postController.createPost);
route.put("/posts/:id", postController.updatePost);
route.delete("/posts/:id", postController.deletePost);
route.get("/posts/like/:id", postController.likePost);
route.post("/posts/comment/:id", postController.commentPost);

module.exports = route;
