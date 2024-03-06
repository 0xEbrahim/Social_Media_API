import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

const updateComment = asyncHandler(async (req, res, next) => {
  const commentId = +req.params.cId;
  const currentUser = +req.user.id;
  const { content } = req.body;
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      userId: currentUser,
    },
  });
  if (!comment)
    return next(new APIError("Error while reaching the comment.", 400));
  const updatedComment = await prisma.comment.update({
    where: {
      id: commentId,
      userId: currentUser,
    },
    data: {
      content: content,
    },
  });
  if (!updatedComment)
    return next(new APIError("Error while updating comment.", 400));
  res.status(200).json({ status: "Success", data: updatedComment });
});
export { updateComment };
