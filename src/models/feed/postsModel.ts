import pool from "../../config/db";
import { Post } from "../../types";

// Create a new post
export const createPost = async (
  post: Omit<Post, "id" | "created_at" | "updated_at">
): Promise<Post> => {
  const { user_id, title, content, post_type } = post;
  const result = await pool.query(
    "INSERT INTO posts (user_id, title, content, post_type) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, title, content, post_type]
  );
  return result.rows[0];
};

// Get a post by ID
export const getPostById = async (id: string): Promise<Post | null> => {
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return result.rows.length ? result.rows[0] : null;
};

// Get all posts
export const getAllPosts = async (): Promise<Post[]> => {
  const result = await pool.query("SELECT * FROM posts");
  return result.rows;
};

// Update a post
export const updatePost = async (
  id: string,
  updates: { title: string; content: any; post_type: string }
): Promise<Post | null> => {
  const { title, content, post_type } = updates;
  const result = await pool.query(
    "UPDATE posts SET title = $1, content = $2, post_type = $3, updated_at = CURRENT_DATE WHERE id = $4 RETURNING *",
    [title, content, post_type, id]
  );
  return result.rows.length ? result.rows[0] : null;
};

// Delete a post
export const deletePost = async (id: string): Promise<boolean> => {
  const result = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
