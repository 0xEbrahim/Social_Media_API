import express from "express";
import {
  createStory,
  currentUserGetStories,
  currentUserStories,
  getSingleStory,
  updateStoryPrivacy,
} from "../controllers/Story/story.index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadSinglePhoto } from "../functions/multer/multer.js";
const router = express.Router();

router.post("/", authMiddleware, uploadSinglePhoto, createStory);
router.get("/", authMiddleware, currentUserGetStories);
router.get("/my-stories", authMiddleware, currentUserStories);
router.get("/:sId", authMiddleware, getSingleStory);
router.patch("/:sId", authMiddleware, updateStoryPrivacy);
export default router;
