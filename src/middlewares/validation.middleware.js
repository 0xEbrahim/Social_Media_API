import { validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

const validationMiddleware = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      status: "Bad request",
      message: errors.array(),
      statusCode: 400,
    });
  next();
});

export { validationMiddleware };
