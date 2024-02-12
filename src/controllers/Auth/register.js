import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { hashPassword } from "../../utils/hashingPassword.js";
import uploader from "../../functions/Cloudinary/cloudinary.js";
import fs from "fs";
const prisma = new PrismaClient();

/**
 * @desc    users create new acount
 * @method  post
 * @route   /api/v1/auth/register
 * @access  public
 */
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, bio, city, website } =
    req.body;
    const role = req.body.role || "USER";
  const avatar = req.file?.path;
  const uplaodedImage = await uploader(avatar);
  const hashedPassword = await hashPassword(password);
  fs.unlinkSync(avatar);
  const user = await prisma.user.create({
    data: {
      name:name,
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
    },
  });
  res.status(200).json({ status: "Success", data: user });
});

export { register };
