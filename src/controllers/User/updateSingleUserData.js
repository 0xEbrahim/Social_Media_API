import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import uploader from "../../functions/Cloudinary/cloudinary.js";
import fs from "fs";
const prisma = new PrismaClient();

/**
 * @desc    Admin updates user's info
 * @method  patch
 * @route   /api/v1/user/:id
 * @access  public
 */
export const updateUser = asyncHandler(async (req, res, next) => {
  const avatar = req.file?.path;
  if (avatar) {
    const uploadedAvatar = await uploader(avatar);
    req.body.image = uploadedAvatar.url;
    fs.unlinkSync(avatar);
  }
  const usr = await prisma.user.findUnique({ where: { id: +req.params.id } });
  if (!usr) return next(new APIError("User is not exist or Invalid ID.", 404));
  const { name, email, city, website, image } = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: +req.params.id,
    },
    data: {
      name : name,
      email: email,
      profile: {
        update: {
          image: image,
          city: city,
          website: website,
        },
      },
    },
  });
  res.json({ status: "Success", updatedUser });
});
