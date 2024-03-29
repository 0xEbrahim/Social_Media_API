import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import { ValidPostToMakeActions } from "../../utils/ValidForActions.js";
const prisma = new PrismaClient();

/**
 * @desc    User can Like or unlike any available post
 * @method  POST
 * @route   /api/v1/like/:pId
 */

const likeOrUnLike = asyncHandler(async (req, res, next) => {
  const postId = +req.params.pId;
  const currentUser = +req.user.id;
  const post = await ValidPostToMakeActions(postId, currentUser);
  if (!post) return next(new APIError("Error while liking the post.", 400));
  const alreadyLiked = await prisma.like.findFirst({
    where: {
      postId: postId,
      userId: currentUser,
    },
  });
  if (!alreadyLiked) {
    const addLike = await prisma.like.create({
      data: {
        postId: postId,
        userId: currentUser,
      },
      select: {
        postId: true,
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!addLike)
      return next(new APIError("Error while liking the post.", 400));
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });
    res
      .status(201)
      .json({ message: `You liked This post ${postId}`, data: addLike });
  } else {
    const unLike = await prisma.like.delete({
      where: {
        postId_userId: {
          postId: postId,
          userId: currentUser,
        },
        postId: postId,
        userId: currentUser,
      },
    });
    if (!unLike)
      return next(new APIError("Error while unliking the post.", 400));
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likesCount: {
          decrement: 1,
        },
      },
    });
    res.status(200).json({ message: `You unliked this post ${postId}` });
  }
});

export { likeOrUnLike };
