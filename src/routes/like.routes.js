import express from "express";
import { likeOrUnLike, getAllLikes } from "../controllers/Like/like.index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getAllLikesOnAPostValidator,
  likeOrUnLikeValidator,
} from "../utils/validation/like.validator.js";
const router = express.Router();

router.post("/:pId", authMiddleware, likeOrUnLikeValidator, likeOrUnLike);
router.get("/:pId", authMiddleware, getAllLikesOnAPostValidator, getAllLikes);
export default router;
