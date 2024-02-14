import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

const getAllPosts = asyncHandler(async (req, res, next) => {
  const limit = +req?.query?.limit || 10;
  const page = +req?.query?.page || 1;
  const skip = (page - 1) * limit;
  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      postedAt: "desc",
    },
  });
  res.status(200).json({ status: "Success", data: posts });
});

export { getAllPosts };
