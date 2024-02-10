import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

export const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = +req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) return next(new APIError("User is not exist or Invalid ID.", 404));

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  res.json(deletedUser);
});
