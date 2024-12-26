import pool from "../config/db";
import { Creature } from "../types";

export const createCreature = async (
  creature: Omit<Creature, "id" | "created_at" | "updated_at">
): Promise<Creature> => {
  const { name, type, description, image_url } = creature;
  const result = await pool.query(
    `INSERT INTO creatures (name, type, description, image_url) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, type, description, image_url]
  );
  return result.rows[0];
};

export const getCreatureById = async (id: string): Promise<Creature | null> => {
  const result = await pool.query(`SELECT * FROM creatures WHERE id = $1`, [
    id,
  ]);
  return result.rows.length ? result.rows[0] : null;
};

export const getAllCreatures = async (): Promise<Creature[]> => {
  const result = await pool.query(`SELECT * FROM creatures`);
  return result.rows;
};

export const updateCreature = async (
  id: string,
  updates: Partial<Omit<Creature, "id" | "created_at" | "updated_at">>
): Promise<Creature | null> => {
  const { name, type, description, image_url } = updates;
  const result = await pool.query(
    `UPDATE creatures
     SET name = COALESCE($1, name), 
         type = COALESCE($2, type), 
         description = COALESCE($3, description), 
         image_url = COALESCE($4, image_url), 
         updated_at = CURRENT_DATE
     WHERE id = $5 RETURNING *`,
    [name, type, description, image_url, id]
  );
  return result.rows.length ? result.rows[0] : null;
};

export const deleteCreature = async (id: string): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM creatures WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
};
