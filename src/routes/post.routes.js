import express from "express";
import {
  adminDeletePost,
  createPost,
  currentUserDeletePost,
  getAllPosts,
  getSinglePost,
  getUserPosts,
  searchAboutPost,
  updatePost,
} from "../controllers/Post/post.index.js";
import { uploadMultiPhotos } from "../functions/multer/multer.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createPostValidator,
  currentUserDeletePostValidator,
  getAllPostsValidator,
  getSinglePostValidator,
  getUserPostsValidator,
  searchAboutPostValidator,
  updatePostValidator,
} from "../utils/validation/post.validator.js";
const router = express.Router();

router.post(
  "/create-post",
  authMiddleware,
  uploadMultiPhotos,
  createPostValidator,
  createPost
);
router.get("/", authMiddleware, isAdmin, getAllPostsValidator, getAllPosts);
router.get(
  "/search",
  authMiddleware,
  searchAboutPostValidator,
  searchAboutPost
);
router.get("/my-posts", authMiddleware, getUserPostsValidator, getUserPosts);
router.get("/:id", authMiddleware, getSinglePostValidator, getSinglePost);

router.patch(
  "/:Pid",
  authMiddleware,
  uploadMultiPhotos,
  updatePostValidator,
  updatePost
);
//router.delete("/:id", authMiddleware, isAdmin, adminDeletePost);
router.delete(
  "/:id",
  authMiddleware,
  currentUserDeletePostValidator,
  currentUserDeletePost
);
export default router;
