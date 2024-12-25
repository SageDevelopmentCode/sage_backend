import pool from "../config/db";
import { User } from "../types";

// Create User
export const createUser = async (
  user: Omit<User, "id" | "created_at" | "updated_at">
): Promise<User> => {
  const { name, username, password } = user;
  const result = await pool.query(
    "INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *",
    [name, username, password]
  );
  return result.rows[0];
};

// Get User by ID
export const getUserById = async (id: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows.length ? result.rows[0] : null;
};

// Get All Users
export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

// Update User
export const updateUser = async (
  id: string,
  user: Partial<Omit<User, "id" | "created_at" | "updated_at">>
): Promise<User | null> => {
  const { name, username, password } = user;
  const result = await pool.query(
    "UPDATE users SET name = COALESCE($1, name), username = COALESCE($2, username), password = COALESCE($3, password), updated_at = NOW() WHERE id = $4 RETURNING *",
    [name, username, password, id]
  );
  return result.rows.length ? result.rows[0] : null;
};

// Delete User
export const deleteUser = async (id: string): Promise<boolean> => {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
