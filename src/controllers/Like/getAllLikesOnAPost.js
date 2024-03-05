import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc    User can get likes to specific post
 * @method  GET 
 * @route   /api/v1/like/:pId
 * 
 */

const getAllLikes = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const postId = +req.params.pId;
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
  const followingsId = followingsList.map((el) => el.followed.id) ?? [];
  const likesList = await prisma.post.findFirst({
    where: {
      OR: [
        {
          id: postId,
          userId: {
            in: followingsId,
          },
          privacy: {
            in: ["PUBLIC", "FOLLOWERS"],
          },
        },
        {
          privacy: "PUBLIC",
        },
      ],
    },
    select: {
      likes: {
        select: {
          Post: {
            select: {
              id: true,
            },
          },
          User: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  //   console.log(likesList);
  if (!likesList) return next(new APIError("Error getting post likes", 400));
  res.json({ status: "Success", data: likesList });
});

export { getAllLikes };
