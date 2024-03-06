import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

const getAllFollowed = asyncHandler(async (currentUser) => {
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
  const followingsId = followingsList.map((el) => el.followed.id);
  return followingsId;
});

const ValidPostToMakeActions = asyncHandler(async (postId, currentUser) => {
  const followingsId = await getAllFollowed(currentUser);
  const post = await prisma.post.findFirst({
    where: {
      OR: [
        {
          id: postId,
          privacy: {
            in: ["PUBLIC", "FOLLOWERS"],
          },
          userId: {
            in: followingsId,
          },
        },
        {
          id: postId,
          privacy: "PUBLIC",
        },
      ],
    },
  });
  return post;
});

const ValidStoryToMakeActions = asyncHandler(async (postId, currentUser) => {
  const followingsId = await getAllFollowed(currentUser);
  const story = await prisma.story.findFirst({
    where: {
      OR: [
        {
          id: postId,
          privacy: {
            in: ["PUBLIC", "FOLLOWERS"],
          },
          userId: {
            in: followingsId,
          },
        },
        {
          id: postId,
          privacy: "PUBLIC",
        },
      ],
    },
  });
  return story;
});

export { ValidPostToMakeActions, ValidStoryToMakeActions, getAllFollowed };
