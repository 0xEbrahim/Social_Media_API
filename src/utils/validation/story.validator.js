import { PrismaClient } from "@prisma/client";
import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
const prisma = new PrismaClient();

const createStoryValidator = [
  check("privacy")
    .notEmpty()
    .withMessage("You must choose your story privacy")
    .isIn(["PUBLIC", "PRIVATE", "FOLLOWERS"])
    .withMessage("Invalid privacy choice"),
  validationMiddleware,
];

const currentUserGetStoriesValidator = [
  check("limit").optional().isNumeric().withMessage("Limit should be a number"),
  check("page")
    .optional()
    .isNumeric()
    .withMessage("Page number should be a number"),
  validationMiddleware,
];

const deleteStoryValidator = [
  check("sId")
    .notEmpty()
    .withMessage("Story id should be provided to be deleted.")
    .isNumeric()
    .withMessage("Story id should be a numerical value")
    .custom(async (value) => {
      const story = prisma.story.findUnique({
        where: {
          id: +value,
        },
      });
      if (!story) throw new Error("Error while deleting story");
    }),
  validationMiddleware,
];

const getSingleStory = [
  check("sId")
    .notEmpty()
    .withMessage("Story id should be provided to be deleted.")
    .isNumeric()
    .withMessage("Story id should be a numerical value")
    .custom(async (value) => {
      const story = prisma.story.findUnique({
        where: {
          id: +value,
        },
      });
      if (!story) throw new Error("Error while deleting story");
    }),
  validationMiddleware,
];

const updateStoryPrivacyValidator = [
  check("sId")
    .notEmpty()
    .withMessage("Story id should be provided to be deleted.")
    .isNumeric()
    .withMessage("Story id should be a numerical value")
    .custom(async (value) => {
      const story = prisma.story.findUnique({
        where: {
          id: +value,
        },
      });
      if (!story) throw new Error("Error while deleting story");
    }),
  check("privacy")
    .notEmpty()
    .withMessage("You must choose your story privacy")
    .isIn(["PUBLIC", "PRIVATE", "FOLLOWERS"])
    .withMessage("Invalid privacy choice"),
  validationMiddleware,
];
export {
  createStoryValidator,
  deleteStoryValidator,
  currentUserGetStoriesValidator,
  getSingleStory,
  updateStoryPrivacyValidator,
};
