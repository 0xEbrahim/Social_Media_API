import { PrismaClient, privacy } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();


/**
 * @desc    USER can see his stories
 * @method  GET
 * @route   /api/v1/story/my-stories
 */
const currentUserStories = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const stories = await prisma.story.findMany({
    where: {
      userId: currentUser,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  res.json({ count: stories.length, data: stories });
});

export { currentUserStories };
