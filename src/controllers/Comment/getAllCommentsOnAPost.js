import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import {
  ValidPostToMakeActions,
} from "../../utils/ValidForActions.js";
const prisma = new PrismaClient();

const getAllCommentsOnAPost = asyncHandler(async (req, res, next) => {
  const postId = +req.params.pId;
  const currentUser = +req.user.id;
  const post = await ValidPostToMakeActions(postId, currentUser);
  if (!post)
    return next(new APIError("We can't reach this Post at this time.", 400));
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    select: {
      postId: true,
      User: {
        select: {
          id: true,
          name: true,
        },
      },
      content: true,
    },
  });
  if (!comments)
    return next(new APIError("Error while getting comments.", 400));
  res.status(200).json({ status: "Success", data: comments });
});

export { getAllCommentsOnAPost };
