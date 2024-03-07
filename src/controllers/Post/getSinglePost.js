import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { ValidPostToMakeActions } from "../../utils/ValidForActions.js";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc    GET SINGLE POST
 * @method  GET
 * @route   /api/v1/post/:id
 */
const getSinglePost = asyncHandler(async (req, res, next) => {
  const id = +req.params.id;
  const userId = +req.user.id;
  const postCheck = await ValidPostToMakeActions(id, userId);
  if (!postCheck) return next(new APIError("Error while getting post.", 400));
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  if (!post) return next(new APIError(`Post not found for id : ${id}`, 404));
  res.status(200).json({ status: "Success", data: post });
});

export { getSinglePost };
