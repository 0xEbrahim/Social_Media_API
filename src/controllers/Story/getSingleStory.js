import { PrismaClient, privacy } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import { ValidStoryToMakeActions } from "../../utils/ValidForActions.js";
const prisma = new PrismaClient();

/**
 * @desc    USER can see a specific story
 * @method  GET
 * @route   /api/v1/story/:sId
 */
const getSingleStory = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const storyId = +req.params.sId;
  const story = await ValidStoryToMakeActions(storyId, currentUser);
  if (!story) return next(new APIError("Story not found", 404));
  res.status(200).json({ status: "Success", data: story });
});

export { getSingleStory };
