import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

const getAllFollowers = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const followersList = await prisma.followRelation.findMany({
    where: {
      followedId: currentUser,
    },
    skip : skip,
    take : limit,
    include: {
      follower: {
        select: {
          name: true,
        },
      },
    },
  });
  res.status(200).json({
    count: followersList.length,
    data: followersList,
  });
});

export { getAllFollowers };
