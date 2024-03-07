import { PrismaClient } from "@prisma/client";
import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
const prisma = new PrismaClient();
const getUserPostsValidator = [
  check("limit").optional().isNumeric().withMessage("Limit should be a number"),
  check("page")
    .optional()
    .isNumeric()
    .withMessage("Page number should be a number"),
  check("privacy")
    .notEmpty()
    .withMessage("You should choose post privacy")
    .isIn(["PUBLIC", "PRIVATE", "FOLLOWERS"])
    .withMessage("Privacy should be in [PUBLIC, PRIVATE, FOLLOWERS]"),
  validationMiddleware,
];

const updatePostValidator = [
  check("Pid")
    .isNumeric()
    .withMessage("Post id should be a numerical value")
    .custom(async (value) => {
      const post = await prisma.post.findUnique({
        where: {
          id: +value,
        },
      });
      if (!post) throw new Error("Post not found");
    }),
  check("title")
    .optional()
    .notEmpty()
    .withMessage("Post should have a title")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters")
    .isLength({ max: 20 })
    .withMessage("Title can be at most 20 characters"),
  check("privacy")
    .optional()
    .notEmpty()
    .withMessage("You should choose post privacy")
    .isIn(["PUBLIC", "PRIVATE", "FOLLOWERS"])
    .withMessage("Privacy should be in [PUBLIC, PRIVATE, FOLLOWERS]"),
  check("content")
    .optional()
    .notEmpty()
    .withMessage("Post can't be empty")
    .isLength({ max: 500 })
    .withMessage("Post can be at most 500 characters"),
  check("image")
    .optional()
    .isString()
    .withMessage("image url should be a string format"),
  validationMiddleware,
];

const searchAboutPostValidator = [
  check("keywords").notEmpty().withMessage("Enter keyword to search with"),
  check("limit").optional().isNumeric().withMessage("Limit should be a number"),
  check("page")
    .optional()
    .isNumeric()
    .withMessage("Page number should be a number"),
  validationMiddleware,
];

const getSinglePostValidator = [
  check("id").isNumeric().withMessage("Post id should be numerical value"),
  validationMiddleware,
];

const createPostValidator = [
  check("title")
    .notEmpty()
    .withMessage("post title cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters")
    .isLength({ max: 20 })
    .withMessage("Title can be at most 20 characters"),
  check("privacy")
    .notEmpty()
    .withMessage("You should choose post privacy")
    .isIn(["PUBLIC", "PRIVATE", "FOLLOWERS"])
    .withMessage("Privacy should be in [PUBLIC, PRIVATE, FOLLOWERS]"),
  check("content")
    .notEmpty()
    .withMessage("Post can't be empty")
    .isLength({ max: 500 })
    .withMessage("Post can be at most 500 characters"),
  check("image").optional().isArray(),
  validationMiddleware,
];

const currentUserDeletePostValidator = [
  check("id")
    .isNumeric()
    .withMessage("postId should be a numerical value")
    .custom(async (value) => {
      const post = await prisma.post.findUnique({
        where: {
          id: +value,
        },
      });
      if (!post) throw new Error("Error while finding the post");
    }),
  validationMiddleware,
];

const getAllPostsValidator = [
  check("limit").optional().isNumeric().withMessage("Limit should be a number"),
  check("page")
    .optional()
    .isNumeric()
    .withMessage("Page number should be a number"),
  validationMiddleware,
];
export {
  currentUserDeletePostValidator,
  getUserPostsValidator,
  getSinglePostValidator,
  updatePostValidator,
  searchAboutPostValidator,
  createPostValidator,
  getAllPostsValidator,
};
