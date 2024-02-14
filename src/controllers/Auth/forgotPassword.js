import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import APIError from "../../utils/APIError.js";
import { sendEmailToUser } from "../../functions/Mail/email.config.js";
const prisma = new PrismaClient();

const forgotPassword = asyncHandler(async (req, res, next) => {
  const email = req.body?.email;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user)
    return next(new APIError(`User not found for email : ${email}`), 404);
  const plainResetToken = crypto.randomBytes(64).toString("hex");
  const hashedResetToken = await crypto
    .createHash("sha256")
    .update(plainResetToken)
    .digest("hex");
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      passwordResetToken: hashedResetToken,
      passwordResetTokenExpire: String(Date.now() + 15 * 60 * 1000),
    },
  });
  const info = {
    from: `Mailer Company`,
    to: email,
    subject: "PasswordResetToken",
    text: "Now you can reset you password.",
    htm: `<h1>Password reset </h1>
          <p>Here is your password reset token:  ${plainResetToken}</p>
          <p>If you did not request a password reset, please ignore this email.</p>`,
  };
  await sendEmailToUser(info);
  res
    .status(200)
    .json({ status: "Success", message: "password reset code has been sent." });
});

export { forgotPassword };
