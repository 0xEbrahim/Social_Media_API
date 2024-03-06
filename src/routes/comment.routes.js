import express from "express";
const router = express.Router();
import { createComment } from "../controllers/Comment/comment.index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
router.post("/:pId", authMiddleware, createComment);
export default router;
