import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import APIError from "../../utils/APIError.js";
import { sendEmailToUser } from "../../functions/Mail/email.config.js";
const prisma = new PrismaClient();

const verifyEmail = asyncHandler(async (req, res, next) => {
  const token = req.params?.token;
  const hashToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await prisma.user.findFirst({
    where: {
      emailVerificationToken: hashToken,
    },
  });
  if (!user) return next(new APIError("Invalid verfiy email token.", 409));
  await prisma.user.update({
    where: {
      emailVerificationToken: hashToken,
    },
    data: {
      emailVerificationToken: null,
      emailVerified: true,
    },
  });
  res.status.json({ status: "Success", message: "Email verfied." });
});

export { verifyEmail };
