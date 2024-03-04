import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import uploader from "../../functions/Cloudinary/cloudinary.js";
import fs from "fs";
const prisma = new PrismaClient();

const updatePost = asyncHandler(async (req, res, next) => {
  const currentUser = +req.user.id;
  const postId = +req.params.Pid;
  const { title, content, privacy } = req.body;
  console.log(title, content, privacy);
  const img = req.files;
  if (img) {
    const urls = [];
    for (let file of img) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath.url);
      fs.unlinkSync(path);
    }
    req.urls = urls;
  }
  const { urls } = req;

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
      userId: currentUser,
    },
    data: {
      title: title,
      content: content,
      privacy: privacy,
      image: urls,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  if (!updatedPost)
    return next(new APIError("Post not found or have no access", 404));
  res
    .status(200)
    .json({ status: "Success", message: "Updated", data: updatedPost });
});

export { updatePost };
