import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  getAllUsersController,
} from "../controllers/userController";

const router = Router();

router.post("/users", createUserController);
router.get("/users", getAllUsersController);
router.get("/users/:id", getUserByIdController);

export default router;
