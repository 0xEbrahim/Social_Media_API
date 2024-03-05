import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();


/**
 * @desc    Current user can delete his post
 * @method  DELETE   
 * @route   /api/v1/post/:id
 */
const currentUserDeletePost = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const postId = +req.params.id;
  const post = await prisma.post.findUnique({
    where: {
      userId: currentUser,
      id: postId,
    },
  });
  if (!post)
    return next(new APIError(`You can't delete this post, or not exist`, 400));
  await prisma.post.delete({
    where: {
      userId: currentUser,
      id: postId,
    },
  });
  await prisma.$transaction([
    prisma.comment.deleteMany({
      where: {
        postId: postId,
      },
    }),
    prisma.like.deleteMany({
      where: {
        postId: postId,
      },
    }),
  ]);
  res.status(200).json({
    status: "Success",
    message: "Post has been deleted",
  });
});

export { currentUserDeletePost };
