import express from "express";
import { likeOrUnLike, getAllLikes } from "../controllers/Like/like.index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/:pId", authMiddleware, likeOrUnLike);
router.get("/:pId", authMiddleware, getAllLikes);
export default router;
