import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

const registerValidator = [
  check("name")
    .isLength({ min: 5 })
    .withMessage("Name should be at least 5 characters")
    .isLength({ max: 50 })
    .withMessage("Name can be 50 characters at most."),
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please Enter a valid Email"),
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
  validationMiddleware,
];

const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please Enter a valid Email"),
  check("password").notEmpty().withMessage("password is required"),
  validationMiddleware,
];

const changePasswordValidator = [
  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("password should be at least 8 characters")
    .isLength({
      max: 22,
    })
    .withMessage("Password can be 22 characters at most"),
  validationMiddleware,
];
const forgotPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please Enter a valid Email"),
  validationMiddleware,
];

const resetPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please Enter a valid Email"),
  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("password should be at least 8 characters")
    .isLength({
      max: 22,
    })
    .withMessage("Password can be 22 characters at most"),
  validationMiddleware,
];

const verifyResetPasswordValidator = [
  check("token")
    .notEmpty()
    .withMessage("Token is required")
    .isLength({ min: 128 })
    .withMessage("invalid token")
    .isLength({ max: 128 })
    .withMessage("invalid token"),
  validationMiddleware,
];

const verifyEmailValidator = [
  check("token").notEmpty().withMessage("Token is required"),
  validationMiddleware,
];
export {
  registerValidator,
  loginValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  verifyResetPasswordValidator,
  verifyEmailValidator,
};
