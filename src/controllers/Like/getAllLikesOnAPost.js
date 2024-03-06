import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import { ValidPostToMakeActions } from "../../utils/ValidForActions.js";
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
  const post = await ValidPostToMakeActions(postId, currentUser);
  if (!post) return next(new APIError("Error while liking the post.", 400));
  const likesList = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      likes: {
        select: {
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
  //console.log(likesList);
  if (!likesList) return next(new APIError("Error getting post likes", 400));
  res.json({ status: "Success", data: likesList });
});

export { getAllLikes };
