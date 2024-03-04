import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();
const searchAboutPost = asyncHandler(async (req, res, next) => {
  const { keywords } = req.query;
  const sort = req.query.sort || "updatedAt";
  const sortDir = req.query.sortDir || "desc";
  const page = req.query?.page || 1;
  const limit = req.query?.limit || 20;
  const skip = (page - 1) * limit;
  let sortObj = { [sort]: sortDir };
  const search = await prisma.post.findMany({
    where: {
      privacy: "PUBLIC",
      OR: [
        {
          title: {
            contains: keywords,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: keywords,
            mode: "insensitive",
          },
        },
      ],
    },
    skip: skip,
    take: limit,
    orderBy: sortObj,
  });
  res.status(200).json({ count: search.length, data: search });
});
export { searchAboutPost };
