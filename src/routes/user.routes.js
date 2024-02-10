import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/User/user.index.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getSingleUser);
router.patch("/", authMiddleware, updateUser);
router.patch("/change-password", authMiddleware, changePassword);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

export default router;
