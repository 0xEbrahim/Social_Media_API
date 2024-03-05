import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import uploader from "../../functions/Cloudinary/cloudinary.js";
import APIError from "../../utils/APIError.js";
import fs from "fs";
const prisma = new PrismaClient();

/**
 * @desc    USER can create new story
 * @method  POST
 * @route   /api/v1/story/
 */
const createStory = asyncHandler(async (req, res, next) => {
  const { privacy } = req.body;
  const img = req.file;
  const url = await uploader(img.path);
  fs.unlinkSync(img.path);
  const story = await prisma.story.create({
    data: {
      userId: +req.user.id,
      privacy: privacy,
      image: url.url,
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
  if (!story) return next(new APIError("Error while creating story", 400));
  res.status(201).json({ status: "Success", data: story });
});

export { createStory };
