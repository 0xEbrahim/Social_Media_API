import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { hashPassword } from "../../utils/hashingPassword.js";
const prisma = new PrismaClient();

/**
 * @desc    Users can change password
 * @method  patch
 * @route   /api/v1/user/change-password
 * @access  public
 */
export const changePassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = await hashPassword(password);
  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  res.status(201).json({ status: "Success" });
});
