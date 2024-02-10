import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

const registerValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ max: 15 })
    .withMessage("Too long name.")
    .isLength({ min: 4 })
    .withMessage("Too short name."),
  validationMiddleware,
];

export { registerValidator };
