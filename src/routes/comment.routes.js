import express from "express";
const router = express.Router();
import {
  createComment,
  deleteComment,
  getAllCommentsOnAPost,
} from "../controllers/Comment/comment.index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
router.post("/:pId", authMiddleware, createComment);
router.get("/:pId", authMiddleware, getAllCommentsOnAPost);
router.delete("/:cId", authMiddleware, deleteComment);
export default router;
