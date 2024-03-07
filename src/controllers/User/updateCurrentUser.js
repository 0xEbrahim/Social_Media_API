import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import uploader from "../../functions/Cloudinary/cloudinary.js";
import fs from "fs";
import crypto from "crypto";
import { sendEmailToUser } from "../../functions/Mail/email.config.js";
const prisma = new PrismaClient();

/**
 * @desc    user updates his info
 * @method  patch
 * @route   /api/v1/user/
 * @access  public
 */
export const updateCurrentUser = asyncHandler(async (req, res, next) => {
  const avatar = req.file?.path;
  if (avatar) {
    const uploadedAvatar = await uploader(avatar);
    req.body.image = uploadedAvatar.url;
    fs.unlinkSync(avatar);
  }
  const { name, email, city, website, image } = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: +req.user.id,
    },
    data: {
      name: name,
      profile: {
        update: {
          image: image,
          city: city,
          website: website,
        },
      },
    },
  });
  if (!updatedUser)
    return next(new APIError("User is not exist or Invalid ID.", 404));
  if (email) {
    await prisma.user.update({
      where: {
        id: updatedUser.id,
      },
      data: {
        email: email,
        emailVerified: false,
        emailVerificationToken: null,
      },
    });
    const plainVerfiyToken = crypto.randomBytes(64).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(plainVerfiyToken)
      .digest("hex");
    await prisma.user.update({
      where: {
        email: email,
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
          <p>Hello ${updatedUser.name}, Please follow this link to verfiy your account. </p><a href= 'http://localhost:3000/api/v1/auth/verfiy/${plainVerfiyToken}'> Click link </a>
          <p>If you did not verfiy your account you won't be able to use a lot of website features</p>`,
    };
    await sendEmailToUser(info);
    res.json({
      status: "Success",
      message: "Please visit your provided email to verficatio",
    });
  }
  res.json({ status: "Success", updatedUser });
});
