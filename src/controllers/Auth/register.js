import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { hashPassword } from "../../utils/hashingPassword.js";
import uploader from "../../functions/Cloudinary/cloudinary.js";
import fs from "fs";
import crypto from "crypto";
import APIError from "../../utils/APIError.js";
import { sendEmailToUser } from "../../functions/Mail/email.config.js";
const prisma = new PrismaClient();

/**
 * @desc    users create new acount
 * @method  post
 * @route   /api/v1/auth/register
 * @access  public
 */
const register = asyncHandler(async (req, res, next) => {
  const { name,
     email,
      password,
       bio,
        city,
         website
         } = req.body;
  const role = req.body.role || "USER";
  const avatar = req.file?.path;
  const uplaodedImage = await uploader(avatar);
  const hashedPassword = await hashPassword(password);
  fs.unlinkSync(avatar);
  const user = await prisma.user.create({
    data: {
      name: name,
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
  if (!user)
    return next(
      new APIError(
        "Something wrong happened while sign-up, please try again later"
      ),
      400
    );
  const plainVerfiyToken = crypto.randomBytes(64).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(plainVerfiyToken)
    .digest("hex");
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      emailVerificationToken: hashedToken,
    },
  });
  const info = {
    from: `Mailer Company`,
    to: email,
    subject: "Email verfication",
    text: "Verfiy you email",
    htm: `<h1>Email verfication </h1>
          <p>Please follow this link to verfiy your account. </p><a href= 'http://localhost:3000/api/v1/auth/verfiy/${plainVerfiyToken}'> Click link </a>
          <p>If you did not verfiy your account you won't be able to use a lot of website features</p>`,
  };
  await sendEmailToUser(info);
  res.status(200).json({ status: "Success", data: user });
});

export { register };
