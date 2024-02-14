import express from "express";
import { createPost } from "../controllers/Post/post.index.js";
import { uploadMultiPhotos } from "../functions/multer/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create-post", authMiddleware, uploadMultiPhotos, createPost);

export default router;
