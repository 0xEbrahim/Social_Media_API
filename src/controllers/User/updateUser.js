import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc    user updates his info
 * @method  patch
 * @route   /api/v1/user/:id
 * @access  public
 */
export const updateUser = asyncHandler(async (req, res, next) => {
  const updatedUser = await prisma.user.update({
    where: {
      email: req.user.email,
    },
    data: {
      ...req.body,
    },
  });
  if(!updatedUser)
    return next(new APIError("User is not exist or Invalid ID.", 404));
  res.json({ status: "Success", updatedUser });
});
