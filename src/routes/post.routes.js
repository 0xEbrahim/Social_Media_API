import express from "express";
import {
  adminDeletePost,
  createPost,
  currentUserDeletePost,
  getAllPosts,
  getSinglePost,
  getUserPosts,
  searchAboutPost,
  updatePost,
} from "../controllers/Post/post.index.js";
import { uploadMultiPhotos } from "../functions/multer/multer.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create-post", authMiddleware, uploadMultiPhotos, createPost);
router.get("/", authMiddleware, isAdmin, getAllPosts);
router.get("/search", authMiddleware, searchAboutPost);
router.get("/my-posts", authMiddleware, getUserPosts);
router.get("/:id", authMiddleware, getSinglePost);
router.patch("/:Pid", authMiddleware, uploadMultiPhotos, updatePost);
//router.delete("/:id", authMiddleware, isAdmin, adminDeletePost);
router.delete("/:id", authMiddleware, currentUserDeletePost);
export default router;
