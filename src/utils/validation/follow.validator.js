import { PrismaClient } from "@prisma/client";
import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
const prisma = new PrismaClient();

const followOrUnfollowValidator = [
  check("userId")
    .notEmpty()
    .withMessage("Provide user id")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(value),
        },
      });
      if (!user) throw new Error("User not found.");
    }),
  validationMiddleware,
];

const getAllFollowersValidator = [
  check("limit").optional().isNumeric().withMessage("Limit should be a number"),
  check("page")
    .optional()
    .isNumeric()
    .withMessage("Page number should be a number"),
  validationMiddleware,
];
const getAllFollowingsValidator = [
  check("limit").optional().isNumeric().withMessage("Limit should be a number"),
  check("page")
    .optional()
    .isNumeric()
    .withMessage("Page number should be a number"),
  validationMiddleware,
];
export {
  followOrUnfollowValidator,
  getAllFollowingsValidator,
  getAllFollowersValidator,
};
