import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc    User can deactive/delete his account
 * @method  DELETE
 * @route   /api/v1/user/:id
 */
const deactiveAccount = asyncHandler(async (req, res, next) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id: +req.user.id,
    },
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
  });
  res.status(200).json({
    status: "Success",
    message: "Account deactivated and you had been logged-out.",
  });
});

export { deactiveAccount };
