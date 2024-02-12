import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/User/user.index.js";
import {uploadSinglePhoto} from '../functions/multer/multer.js'
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getSingleUser);
router.patch("/:id", authMiddleware, isAdmin ,uploadSinglePhoto, updateUser);
router.patch("/change-password", authMiddleware, changePassword);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

export default router;
