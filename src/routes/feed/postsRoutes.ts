import { Router } from "express";
import {
  createPostController,
  getPostByIdController,
  getAllPostsController,
  updatePostController,
  deletePostController,
} from "../../controllers/feed/postsController";

const router = Router();

// Route to create a post
router.post("/posts", createPostController);

// Route to get all posts
router.get("/posts", getAllPostsController);

// Route to get a single post by ID
router.get("/posts/:id", getPostByIdController);

// Route to update a post
router.put("/posts/:id", updatePostController);

// Route to delete a post
router.delete("/posts/:id", deletePostController);

export default router;
