import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc    USER can see his followings stories
 * @method  GET
 * @route   /api/v1/story/
 */
const currentUserGetStories = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const limit = +req?.query?.limit || 10;
  const page = +req?.query?.page || 1;
  const skip = (page - 1) * limit;
  const followingsList = await prisma.followRelation.findMany({
    where: {
      followerId: currentUser,
    },
    select: {
      followed: {
        select: {
          id: true,
        },
      },
    },
  });
  //console.log(followingsList);
  const followingsId = followingsList.map((el) => el.followed.id) ?? [];
  const stories = await prisma.story.findMany({
    where: {
      OR: [
        {
          userId: { in: followingsId },
          privacy: { in: ["FOLLOWERS", "PUBLIC"] },
        },
        {
          privacy: "PUBLIC",
        },
      ],
    },
    skip: skip,
    take: limit,
  });
  if (!stories) return next(new APIError("There is no stories rn", 404));
  res.json({ Status: "Success", data: stories });
});

export { currentUserGetStories };
