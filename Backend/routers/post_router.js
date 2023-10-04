import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createPost,
  getPosts,
  getProfilePosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { upload } from "../helpers/uploadImage.js";

const post_router = express.Router();
// post_router.post('/post', verifyToken, createPost);
// post_router.get('/post/:id', verifyToken, getPost);
// post_router.delete('/post/:id', verifyToken, deletePost);
// post_router.get('/post', verifyToken, getPosts);
// post_router.patch('/post/:id', verifyToken, updatePost);
post_router.post("/post", upload.single("file"), createPost);
post_router.get("/posts", getPosts);
post_router.get("/profileposts/:id", getProfilePosts);
post_router.get("/post/:id", getPost);
post_router.patch("/post/edit/:id", upload.single("file"), updatePost);
post_router.delete("/post/delete/:id", deletePost);

export default post_router;
