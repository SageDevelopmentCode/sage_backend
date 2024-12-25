import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController";

const router = Router();

router.post("/users", createUserController);
router.get("/users", getAllUsersController);
router.get("/users/:id", getUserByIdController);
router.put("/users/:id", updateUserController); // Update user
router.delete("/users/:id", deleteUserController); // Delete user

export default router;
