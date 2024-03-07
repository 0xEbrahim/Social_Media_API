import { PrismaClient } from "@prisma/client";
import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
const prisma = new PrismaClient();

const getAllUsersValidator = [
  check("limit").optional().isNumeric().withMessage("Limit should be a number"),
  check("page")
    .optional()
    .isNumeric()
    .withMessage("Page number should be a number"),
  validationMiddleware,
];

const getSingleUserValidator = [
  check("userId")
    .notEmpty()
    .withMessage("provide user id.")
    .isNumeric()
    .withMessage("User Id should be a numerical value"),
  validationMiddleware,
];

const updateCurrentUserValidator = [
  check("image")
    .optional()
    .isString()
    .withMessage("please provide avatar url as a string value"),
  check("name")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Name should be at least 5 characters")
    .isLength({ max: 50 })
    .withMessage("Name can be 50 characters at most."),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please Enter a valid Email")
    .custom(async (value) => {
      const exists = await prisma.user.findUnique({
        where: {
          email: value,
        },
      });
      if (exists) throw new Error("Another user is using this email.");
    }),
  check("bio")
    .optional()
    .isLength({ max: 35 })
    .withMessage("Bio can be at most 35 characters"),
  check("city")
    .optional()
    .notEmpty()
    .withMessage("You city is required to complete register"),
  check("website")
    .optional()
    .isString()
    .withMessage("websire should be a string url"),
  validationMiddleware,
];

const searchForUsersValidator = [
  check("keyword").notEmpty().withMessage("Write a keyword for searching"),
  check("limit").optional().isNumeric().withMessage("Limit should be a number"),
  check("page")
    .optional()
    .isNumeric()
    .withMessage("Page number should be a number"),
  validationMiddleware,
];
const deleteUserValidator = [
  check("id")
    .notEmpty()
    .withMessage("please input user id")
    .isNumeric()
    .withMessage("User id should be a numerical value"),
];

const updateSingleUserValidator = [
  check("image")
    .optional()
    .isString()
    .withMessage("please provide avatar url as a string value"),
  check("name")
    .isLength({ min: 5 })
    .withMessage("Name should be at least 5 characters")
    .isLength({ max: 50 })
    .withMessage("Name can be 50 characters at most."),
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please Enter a valid Email")
    .custom(async (value) => {
      const exists = await prisma.user.findUnique({
        where: {
          email: value,
        },
      });
      if (exists) throw new Error("Another user is using this email.");
    }),
  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("password should be at least 8 characters")
    .isLength({
      max: 22,
    })
    .withMessage("Password can be 22 characters at most"),
  check("bio")
    .isLength({ max: 35 })
    .withMessage("Bio can be at most 35 characters"),
  check("city")
    .notEmpty()
    .withMessage("You city is required to complete register"),
  check("website")
    .optional()
    .isString()
    .withMessage("websire should be a string url"),
  validationMiddleware,
];
export {
  getAllUsersValidator,
  getSingleUserValidator,
  updateCurrentUserValidator,
  searchForUsersValidator,
  deleteUserValidator,
  updateSingleUserValidator,
};
