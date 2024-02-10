import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc    admin lists all user
 * @method  get
 * @route   /api/v1/user/
 * @access  private
 */
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const limit = +query.limit || 10;
  const page = +query.page || 1;
  const skip = (page - 1) * limit;
  const allUsers = await prisma.user.findMany({ skip: skip, take: limit });
  res.status(200).json(allUsers);
});
