import { PrismaClient, privacy } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();


/**
 * @desc    USER can see a specific story
 * @method  GET
 * @route   /api/v1/story/:sId
 */
const getSingleStory = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const storyId = +req.params.sId;
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
  console.log(followingsList);
  const followingsId = followingsList.map((el) => el.followed.id) ?? [];
  const story = await prisma.story.findFirst({
    where: {
      OR: [
        {
          id: storyId,
          userId: {
            in: followingsId,
          },
          privacy: {
            in: ["FOLLOWERS", "PUBLIC"],
          },
        },
        {
          id: storyId,
          privacy: "PUBLIC",
        },
      ],
    },
  });
  if (!story) return next(new APIError("Story not found", 404));
  res.status(200).json({ status: "Success", data: story });
});

export { getSingleStory };
