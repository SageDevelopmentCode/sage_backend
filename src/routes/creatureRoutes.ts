import { Router } from "express";
import {
  createCreatureController,
  getCreatureByIdController,
  getAllCreaturesController,
  updateCreatureController,
  deleteCreatureController,
} from "../controllers/creatureController";

const router = Router();

router.post("/creatures", createCreatureController);
router.get("/creatures", getAllCreaturesController);
router.get("/creatures/:id", getCreatureByIdController);
router.put("/creatures/:id", updateCreatureController);
router.delete("/creatures/:id", deleteCreatureController);

export default router;
