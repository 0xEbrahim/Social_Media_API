import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

const getAllPosts = asyncHandler(async (req, res, next) => {
  const limit = req?.query?.limit || 10;
  const page = req?.query?.page || 2;
  const skip = (page - 1) * limit;
  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      postedAt: "asc",
    },
  });
  res.status.json({ status: "Success", data: posts });
});

export { getAllPosts };
