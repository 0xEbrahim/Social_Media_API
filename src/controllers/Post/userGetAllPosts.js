import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

/**
 * @desc    User list his posts
 * @method  GET
 * @route   /api/v1/post/my-posts
 */
const getUserPosts = asyncHandler(async (req, res, next) => {
  const limit = +req?.query?.limit || 10;
  const page = +req?.query?.page || 1;
  const skip = (page - 1) * limit;
  const privacy = req.query?.privacy;
  const posts = await prisma.post.findMany({
    where: {
      userId: +req.user.id,
      privacy: privacy,
    },
    skip: skip,
    take: limit,
    orderBy: {
      postedAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  res.status(200).json({ status: "Success", data: posts });
});

export { getUserPosts };
