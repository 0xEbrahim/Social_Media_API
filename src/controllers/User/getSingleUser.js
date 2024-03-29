import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc    admin gets one user
 * @method  get
 * @route   /api/v1/user/:id
 * @access  private
 */
export const getSingleUser = asyncHandler(async (req, res, next) => {
  const userId = +req.params.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
    },
  });
  if (!user) return next(new APIError("User is not exist or Invalid ID.", 404));
  res.status(200).json({ status: "Success", user });
});
