import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../utils/APIError.js";
import { verifyAccessToken } from "../utils/createToken.js";
const prisma = new PrismaClient();

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return next(new APIError("Header not found", 400));
  const encodedToken = token.split(" ")[1];
  if (!encodedToken) return next(new APIError("Token not found", 403));
  const decodedToken = await verifyAccessToken(encodedToken);
  const user = await prisma.user.findUnique({ where: { id: decodedToken.id } });
  if (!user) return next(new APIError("You are not allowed.", 401));
  req.user = user;
  next();
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) return next();
  const role = user.role;
  if (role !== "ADMIN") return next(new APIError("You are not admin.", 403));
  next();
});

export { authMiddleware, isAdmin };
