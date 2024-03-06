import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import { ValidPostToMakeActions } from "../../utils/ValidForActions.js";
const prisma = new PrismaClient();

const getASingleComment = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const commentId = +req.params.cId;
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  if (!comment) return next(new APIError("Error while getting comment.", 400));
  const post = await ValidPostToMakeActions(comment.postId, currentUser);
  if (!post) return next(new APIError("Error while getting comment.", 400));
  res.status(200).json({ status: "Success", data: comment });
});

export { getASingleComment };
