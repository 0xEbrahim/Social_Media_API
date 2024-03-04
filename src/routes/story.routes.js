import express from "express";
import {
  createStory,
  currentUserGetStories,
} from "../controllers/Story/story.index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadSinglePhoto } from "../functions/multer/multer.js";
const router = express.Router();

router.post("/", authMiddleware, uploadSinglePhoto, createStory);
router.get("/", currentUserGetStories);
export default router;
