import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  searchForUsers,
  updateCurrentUser,
  updateUser,
} from "../controllers/User/user.index.js";
import {
  getAllUsersValidator,
  getSingleUserValidator,
  updateCurrentUserValidator,
  updateSingleUserValidator,
  deleteUserValidator,
  searchForUsersValidator,
} from "../utils/validation/user.validator.js";
import { uploadSinglePhoto } from "../functions/multer/multer.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllUsersValidator, getAllUsers);
router.get("/search", authMiddleware, searchForUsersValidator, searchForUsers);
router.get(
  "/:id",
  authMiddleware,
  isAdmin,
  getSingleUserValidator,
  getSingleUser
);
router.patch(
  "/",
  authMiddleware,
  updateCurrentUserValidator,
  uploadSinglePhoto,
  updateCurrentUser
);
router.patch(
  "/:id",
  authMiddleware,
  isAdmin,
  updateSingleUserValidator,
  uploadSinglePhoto,
  updateUser
);
router.delete("/:id", authMiddleware, isAdmin, deleteUserValidator, deleteUser);

export default router;
