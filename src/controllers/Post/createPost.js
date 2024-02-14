import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import uploader from "../../functions/Cloudinary/cloudinary.js";
import fs from "fs";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

const createPost = asyncHandler(async (req, res, next) => {
  const { title, content, privacy } = req.body;
  const img = req.files;
  if (img) {
    const urls = [];
    for (let file of img) {
      const { path } = file;
      //console.log("Path => ", path);
      const newPath = await uploader(path);
      //console.log("newPath => ", newPath);
      urls.push(newPath.url);
      fs.unlinkSync(path);
    }
    req.urls = urls;
  }
  const { urls } = req;
  //console.log("URLS => ", urls);
  const newPost = await prisma.post.create({
    data: {
      userId: req.user.id,
      title: title,
      content: content,
      privacy: privacy,
      image: urls,
    },
  });
  res.status(201).json({ status: "Success", data: newPost });
});

export { createPost };
