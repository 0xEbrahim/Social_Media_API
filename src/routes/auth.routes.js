import express from "express";
const router = express.Router();
import {
  login,
  logout,
  refresh,
  register,
  changePassword,
  forgotPassword,
} from "../controllers/Auth/Auth.index.js";
import { uploadSinglePhoto } from "../functions/multer/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/register", uploadSinglePhoto, register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/forgot-password", forgotPassword);
router.get("/refresh", refresh);
router.patch("/change-password", authMiddleware, changePassword);
export default router;
