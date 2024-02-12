import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { hashPassword } from "../../utils/hashingPassword.js";
import cloudinaryUpload from "../../functions/Cloudinary/cloudinary.js";
import fs from 'fs'
const prisma = new PrismaClient();

/**
 * @desc    users create new acount
 * @method  post
 * @route   /api/v1/auth/register
 * @access  public
 */
const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, bio, city, role, website } =
    req.body;
  const avatar = req.file?.path;
  const uplaoder = async (path) => cloudinaryUpload(path, "image");
  
  const uplaodedImage = await uplaoder(avatar);
  const hashedPassword = await hashPassword(password);
  fs.unlinkSync(avatar)
  const user = await prisma.user.create({data : {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: hashedPassword,
    role: role,
    profile: {
      create: {
        bio: bio,
        image: uplaodedImage.url,
        city: city,
        website: website,
      },
    },
  }});
  res.json(user);
});

export { register };
