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
import {
  createCommentValidator,
  deleteCommentValidator,
  getASingleCommentValidator,
  getAllCommentsOnApostValidator,
  updateCommentValidator,
} from "../utils/validation/comment.validator.js";
router.post("/:pId", authMiddleware, createCommentValidator, createComment);
router.get(
  "/:cId",
  authMiddleware,
  getASingleCommentValidator,
  getASingleComment
);
router.get(
  "/comments/:pId",
  authMiddleware,
  getAllCommentsOnApostValidator,
  getAllCommentsOnAPost
);
router.patch("/:cId", authMiddleware, updateCommentValidator, updateComment);
router.delete("/:cId", authMiddleware, deleteCommentValidator, deleteComment);
export default router;
