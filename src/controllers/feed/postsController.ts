import { Request, Response } from "express";
import {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
} from "../../models/feed/postsModel";

// Create a new post
export const createPostController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user_id, title, content, post_type } = req.body;
    const newPost = await createPost({ user_id, title, content, post_type });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Get a post by ID
export const getPostByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const post = await getPostById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get post" });
  }
};

// Get all posts
export const getAllPostsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

// Update a post
export const updatePostController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, content, post_type } = req.body;
  try {
    const updatedPost = await updatePost(id, { title, content, post_type });
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete a post
export const deletePostController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await deletePost(id);
    if (result) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
