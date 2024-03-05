import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc    Admin can delete any post
 * @method  DELETE
 * @route   /api/v1/post/:pId
 * @access  ADMIN
 */
const adminDeletePost = asyncHandler(async (req, res, next) => {
  const postId = +req.params.id;
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post)
    return next(new APIError(`Post not found for ID => ${postId}`, 400));
  await prisma.post.delete({
    where: {
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

export { adminDeletePost };
