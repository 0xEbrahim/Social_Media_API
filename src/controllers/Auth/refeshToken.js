import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import {
  createAccessToken,
  verifyRefreshToken,
} from "../../utils/createToken.js";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

/**
 * @desc    generate refresh token
 * @method  get
 * @route   /api/v1/auth/refresh
 * @access  public
 */
const refresh = asyncHandler(async (req, res, next) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken) return next(new APIError("refresh Token is expired.", 403));
  const decodedToken = await verifyRefreshToken(refreshToken);
  const user = await prisma.user.findUnique({
    where: { id: decodedToken.id },
  });
  if (!user) return next(new APIError("You are not allowed.", 401));
  const accessToken = await createAccessToken(user.id);
  res.status(200).json({ token: accessToken });
});

export { refresh };
