import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

const logout = asyncHandler(async (req, res, next) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken) return next(new APIError("You are not logged-In", 403));
  res.clearCookie("refreshToken", {
    httpOnly: true,
  });
  res.status(200).json({status : "Success"})
});

export { logout };
