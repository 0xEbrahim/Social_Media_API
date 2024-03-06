import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc       User can delete comment
 * @method     DELETE 
 * @route      /api/v1/comment/:cId
 */
const deleteComment = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const commentId = +req.params.cId;
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      userId: currentUser,
    },
  });
  if (!comment) return next(new APIError("Error while deleting comment.", 400));
  const delComment = await prisma.comment.delete({
    where: {
      id: commentId,
      userId: currentUser,
    },
  });
  if (!delComment)
    return next(new APIError("Error while deleting comment.", 400));
await prisma.post.update({
  where: {
    id: delComment.postId,
  },
  data: {
    commentsCount: {
      decrement: 1,
    },
  },
});
  res
    .status(200)
    .json({ status: "Success", message: "Comment deleted successfully" });
});

export { deleteComment };
