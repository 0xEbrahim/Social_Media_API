import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import uploader from "../../functions/Cloudinary/cloudinary.js";
import fs from 'fs'
const prisma = new PrismaClient();

/**
 * @desc    user updates his info
 * @method  patch
 * @route   /api/v1/user/:id
 * @access  public
 */
export const updateUser = asyncHandler(async (req, res, next) => {
  const avatar = req.file?.path;
  if(avatar){
      const uploadedAvatar = await uploader(avatar);
      req.body.image = uploadedAvatar.url;
      fs.unlinkSync(avatar)
  }
  const {firstName, lastName, email, city, website, image} = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: +req.params.id,
    },
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      profile:{
        update:{
          image : image,
          city: city,
          website : website,
        }
      }
    },
  });
  if(!updatedUser)
    return next(new APIError("User is not exist or Invalid ID.", 404));
  res.json({ status: "Success", updatedUser });
});
