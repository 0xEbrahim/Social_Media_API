import express from "express";
const router = express.Router();
import {
  createComment,
  deleteComment,
  getASingleComment,
  getAllCommentsOnAPost,
  updateComment,
} from "../controllers/Comment/comment.index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
router.post("/:pId", authMiddleware, createComment);
router.get("/:cId", authMiddleware, getASingleComment);
router.get("/comments/:pId", authMiddleware, getAllCommentsOnAPost);
router.patch("/:cId", authMiddleware, updateComment);
router.delete("/:cId", authMiddleware, deleteComment);
export default router;
