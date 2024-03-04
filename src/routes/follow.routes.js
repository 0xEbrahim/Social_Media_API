import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import {
  followOrUn,
  getAllFollowers,
  getAllFollowings,
} from "../controllers/Follow/follow.index.js";
const router = express.Router();
router.post("/:userId", authMiddleware, followOrUn);
router.get("/followers", authMiddleware, getAllFollowers);
router.get("/followings", authMiddleware, getAllFollowings);
export default router;
