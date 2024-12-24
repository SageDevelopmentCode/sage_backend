import pool from "../config/db";
import { User } from "../types";

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

export const getUserById = async (id: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows.length ? result.rows[0] : null;
};

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
