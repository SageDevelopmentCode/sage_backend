import { Request, Response } from "express";
import {
  createCreature,
  getCreatureById,
  getAllCreatures,
  updateCreature,
  deleteCreature,
} from "../models/creatureModel";

export const createCreatureController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, type, description, image_url } = req.body;
    const newCreature = await createCreature({
      name,
      type,
      description,
      image_url,
    });
    res.status(201).json(newCreature);
  } catch (error) {
    res.status(500).json({ error: "Failed to create creature" });
  }
};

export const getCreatureByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const creature = await getCreatureById(id);
    if (creature) {
      res.status(200).json(creature);
    } else {
      res.status(404).json({ error: "Creature not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve creature" });
  }
};

export const getAllCreaturesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const creatures = await getAllCreatures();
    res.status(200).json(creatures);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve creatures" });
  }
};

export const updateCreatureController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedCreature = await updateCreature(id, updates);
    if (updatedCreature) {
      res.status(200).json(updatedCreature);
    } else {
      res.status(404).json({ error: "Creature not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update creature" });
  }
};

export const deleteCreatureController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const success = await deleteCreature(id);
    if (success) {
      res.status(200).json({ message: "Creature deleted successfully" });
    } else {
      res.status(404).json({ error: "Creature not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete creature" });
  }
};
