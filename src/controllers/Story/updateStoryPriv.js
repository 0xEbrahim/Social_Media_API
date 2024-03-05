import { PrismaClient, privacy } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

const updateStoryPrivacy = asyncHandler(async (req, res, next) => {
  const storyId = +req.params.sId;
  const newPriv = req.body.privacy;
  console.log(newPriv);
  const currUser = +req.user.id;
  const updatedStory = await prisma.story.update({
    where: {
      id: storyId,
      userId: currUser,
    },
    data: {
      privacy: newPriv,
    },
  });
  if (!updatedStory)
    return next(
      new APIError("Error while updating privacy, try again later.", 400)
    );
  res.json({ status: "Success", data: updatedStory });
});

export { updateStoryPrivacy };
