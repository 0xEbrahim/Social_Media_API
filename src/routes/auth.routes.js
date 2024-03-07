import express from "express";
const router = express.Router();
import {
  login,
  logout,
  refresh,
  register,
  changePassword,
  forgotPassword,
  verifyResetPassword,
  resetPassword,
  verifyEmail,
} from "../controllers/Auth/Auth.index.js";
import { uploadSinglePhoto } from "../functions/multer/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  changePasswordValidator,
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  resetPasswordValidator,
  verifyEmailValidator,
  verifyResetPasswordValidator,
} from "../utils/validation/auth.validator.js";

router.post("/register", uploadSinglePhoto, registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/logout", authMiddleware, logout);
router.get("/refresh", refresh);
router.get("/forgot-password", forgotPasswordValidator, forgotPassword);
router.patch(
  "/verify-reset-token",
  verifyResetPasswordValidator,
  verifyResetPassword
);
router.patch("/reset-password", resetPasswordValidator, resetPassword);
router.patch(
  "/change-password",
  authMiddleware,
  changePasswordValidator,
  changePassword
);
router.get("/verfiy/:token", verifyEmailValidator, verifyEmail);
export default router;
