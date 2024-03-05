import { PrismaClient, privacy } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc    USER can delete a story
 * @method  DELETE
 * @route   /api/v1/story/:sId
 */
const deleteStory = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const storyId = +req.params.sId;
  const findStory = await prisma.story.findFirst({
    where: {
      id: storyId,
      userId: currentUser,
    },
  });
  if (!findStory)
    return next(new APIError("Error while deleting story or not found.", 400));
  await prisma.story.delete({
    where: {
      id: storyId,
      userId: currentUser,
    },
  });
  res.json({ status: "Success" });
});

export { deleteStory };
