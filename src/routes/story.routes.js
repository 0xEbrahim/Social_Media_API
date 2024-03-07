import express from "express";
import {
  createStory,
  currentUserGetStories,
  currentUserStories,
  deleteStory,
  getSingleStory,
  updateStoryPrivacy,
} from "../controllers/Story/story.index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadSinglePhoto } from "../functions/multer/multer.js";
import {
  createStoryValidator,
  deleteStoryValidator,
  updateStoryPrivacyValidator,
} from "../utils/validation/story.validator.js";
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  uploadSinglePhoto,
  createStoryValidator,
  createStory
);
router.get("/", authMiddleware, currentUserGetStories);
router.get("/my-stories", authMiddleware, currentUserStories);
router.get("/:sId", authMiddleware, getSingleStory, getSingleStory);
router.patch(
  "/:sId",
  authMiddleware,
  updateStoryPrivacyValidator,
  updateStoryPrivacy
);
router.delete("/:sId", authMiddleware, deleteStoryValidator, deleteStory);
export default router;
