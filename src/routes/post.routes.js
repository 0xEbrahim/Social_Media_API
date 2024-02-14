import express from "express";
import { createPost, getAllPosts } from "../controllers/Post/post.index.js";
import { uploadMultiPhotos } from "../functions/multer/multer.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create-post", authMiddleware, uploadMultiPhotos, createPost);
router.get("/", authMiddleware, isAdmin, getAllPosts);
export default router;
