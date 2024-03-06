import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

const registerValidator = [
  check("name").,
  validationMiddleware,
];

export { registerValidator };
