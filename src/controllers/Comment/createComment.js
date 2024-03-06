import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import { ValidPostToMakeActions } from "../../utils/ValidForActions.js";
const prisma = new PrismaClient();

const createComment = asyncHandler(async (req, res, next) => {
  const postId = +req.params.pId;
  const currentUser = +req.user.id;
  const { content } = req.body;
  const post = await ValidPostToMakeActions(postId, currentUser);
  if (!post)
    return next(new APIError("We can't reach this comment at this time.", 400));
  const comment = await prisma.comment.create({
    data: {
      postId: postId,
      userId: currentUser,
      content: content,
    },
    select: {
      id: true,
      content: true,
      User: {
        select: {
          name: true,
          id: true,
        },
      },
      Post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  if (!comment)
    return next(new APIError("Error occured while commenting.", 400));
  res.status(201).json({ status: "Success", data: comment });
});

export { createComment };
