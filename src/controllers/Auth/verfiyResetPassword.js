import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

const verifyResetPassword = asyncHandler(async (req, res, next) => {
  const resetToken = req.body.token;
  const hashed = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: hashed,
    },
  });
  if (!user || Number(user.passwordResetTokenExpire) < Date.now())
    return next(
      new APIError(
        "Expired or Invalid password reset token, please try another one",
        400
      )
    );
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      passwordResetToken: null,
      passwordResetTokenExpire: null,
      passwordResetTokenVerfied: true,
    },
  });
  res
    .status(200)
    .json({ status: "Success", message: "Password reset token verfied." });
});

export { verifyResetPassword };
