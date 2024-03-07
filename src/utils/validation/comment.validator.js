import { PrismaClient } from "@prisma/client";
import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
const prisma = new PrismaClient();

const createCommentValidator = [
  check("pId").isNumeric().withMessage("Post Id should be numerical value"),
  check("content")
    .notEmpty()
    .withMessage("You should write something to comment")
    .isLength({ max: 212 })
    .withMessage("Comment max length is 212 characters"),
  validationMiddleware,
];

const updateCommentValidator = [
  check("cId")
    .isNumeric()
    .withMessage("Comment Id should be numerical value")
    .custom(async (value) => {
      const comment = await prisma.comment.findUnique({
        where: {
          id: +value,
        },
      });
      if (!comment) throw new Error("Error while getting comment.");
    }),
  check("content")
    .optional()
    .notEmpty()
    .withMessage("You should write something to comment")
    .isLength({ max: 212 })
    .withMessage("Comment max length is 212 characters"),
  validationMiddleware,
];

const deleteCommentValidator = [
  check("cId")
    .isNumeric()
    .withMessage("Comment Id should be numerical value")
    .custom(async (value) => {
      const comment = await prisma.comment.findUnique({
        where: {
          id: +value,
        },
      });
      if (!comment) throw new Error("Error while getting comment.");
    }),
  validationMiddleware,
];

const getASingleCommentValidator = [
  check("cId")
    .isNumeric()
    .withMessage("Comment Id should be numerical value")
    .custom(async (value) => {
      const comment = await prisma.comment.findUnique({
        where: {
          id: +value,
        },
      });
      if (!comment) throw new Error("Error while getting comment.");
    }),
  validationMiddleware,
];

const getAllCommentsOnApostValidator = [
  check("pId")
    .isNumeric()
    .withMessage("Post id should be a numerical number.")
    .custom(async (value) => {
      const post = await prisma.post.findUnique({
        where: {
          id: +value,
        },
      });
      if (!post) throw new Error("Post not found.");
    }),
  validationMiddleware,
];
export {
  createCommentValidator,
  deleteCommentValidator,
  updateCommentValidator,
  getASingleCommentValidator,
  getAllCommentsOnApostValidator,
};
