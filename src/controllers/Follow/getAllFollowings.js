import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

const getAllFollowings = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const followingsList = await prisma.followRelation.findMany({
    where: {
      followerId: currentUser,
    },
    skip: skip,
    take: limit,
    include: {
      followed: {
        select: {
          name: true,
        },
      },
    },
  });
  res.status(200).json({
    count: followingsList.length,
    data: followingsList,
  });
});

export { getAllFollowings };
