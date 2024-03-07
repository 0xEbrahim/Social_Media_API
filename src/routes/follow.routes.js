import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import {
  followOrUn,
  getAllFollowers,
  getAllFollowings,
} from "../controllers/Follow/follow.index.js";
import {
  followOrUnfollowValidator,
  getAllFollowersValidator,
} from "../utils/validation/follow.validator.js";
const router = express.Router();
router.post("/:userId", authMiddleware, followOrUnfollowValidator, followOrUn);
router.get(
  "/followers",
  authMiddleware,
  getAllFollowersValidator,
  getAllFollowers
);
router.get(
  "/followings",
  authMiddleware,
  getAllFollowersValidator,
  getAllFollowings
);
export default router;
