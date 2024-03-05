import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

const likeOrUnLike = asyncHandler(async (req, res, next) => {
  const postId = +req.params.pId;
  const currentUser = +req.user.id;
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
  const post = await prisma.post.findFirst({
    where: {
      OR: [
        {
          id: postId,
          userId: {
            in: followingsId,
          },
          privacy: {
            in: ["FOLLOWERS", "PUBLIC"],
          },
        },
        {
          id: postId,
          privacy: "PUBLIC",
        },
      ],
    },
  });
  if (!post) return next(new APIError("Error while liking the post.", 400));
  //res.json({ data: post });
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
    res.status(200).json({ message: `You unliked this post ${postId}` });
  }
});

export { likeOrUnLike };
