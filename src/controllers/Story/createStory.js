import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import uploader from "../../functions/Cloudinary/cloudinary.js";
const prisma = new PrismaClient();

const createStory = asyncHandler(async (req, res, next) => {
  const { privacy } = req.body;
  const img = req.file;
  const url = await uploader(img.path);
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
  res.status(201).json({ status: "Success", data: story });
});

export { createStory };
