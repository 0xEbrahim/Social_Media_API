import express from "express";
import {
  adminDeletePost,
  createPost,
  getAllPosts,
  getSinglePost,
  getUserPosts,
} from "../controllers/Post/post.index.js";
import { uploadMultiPhotos } from "../functions/multer/multer.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create-post", authMiddleware, uploadMultiPhotos, createPost);
router.get("/", authMiddleware, isAdmin, getAllPosts);
router.get("/my-posts", authMiddleware, getUserPosts);
router.get("/:id", authMiddleware, getSinglePost);
router.delete("/:id", authMiddleware, isAdmin, adminDeletePost);
export default router;
