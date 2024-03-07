import { PrismaClient } from "@prisma/client";
import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
const prisma = new PrismaClient();

const likeOrUnLikeValidator = [
  check("pId")
    .notEmpty()
    .withMessage("post id is required")
    .isNumeric()
    .withMessage("Post id is required")
    .custom(async (value) => {
      const post = await prisma.post.findUnique({
        where: {
          id: +value,
        },
      });
      if (!post) throw new Error("Error while finding post");
    }),
  validationMiddleware,
];

const getAllLikesOnAPostValidator = [
  check("pId")
    .notEmpty()
    .withMessage("post id is required")
    .isNumeric()
    .withMessage("Post id is required")
    .custom(async (value) => {
      const post = await prisma.post.findUnique({
        where: {
          id: +value,
        },
      });
      if (!post) throw new Error("Error while finding post");
    }),
  validationMiddleware,
];

export { likeOrUnLikeValidator, getAllLikesOnAPostValidator };
