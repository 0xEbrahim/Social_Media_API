import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

/**
 * @desc    User can serach about another user using keywords
 * @method  GET
 * @route   /api/v1/user/search?
 */
export const searchForUsers = asyncHandler(async (req, res, next) => {
  const { keyword } = req.query;
  const sort = req.query.sort || "updatedAt";
  const sortDir = req.query.sortDir || "desc";
  const page = req.query?.page || 1;
  const limit = req.query?.limit || 20;
  const skip = (page - 1) * limit;
  let sortObj = { [sort]: sortDir };
  
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ],
    },
    skip: skip,
    take: limit,
    orderBy: sortObj,
  });
  res.status(200).json({ status: "Success", data: users });
});
