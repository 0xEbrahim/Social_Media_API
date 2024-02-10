import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import { comparePassword } from "../../utils/hashingPassword.js";
import { createAccessToken, createRefreshToken } from "../../utils/createToken.js";
const prisma = new PrismaClient();

/**
 * @desc    Users use email and password to login
 * @method  post
 * @route   /api/v1/auth/login
 * @access  public
 */

const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({where : {email : email}})
    if(!user)
        return next(new APIError("Wrong email or password.", 400))
    const matchedPasswords = await comparePassword(password, user.password);
    if(!matchedPasswords)
        return next(new APIError("Wrong email or password.", 400));
    const accessToken = await createAccessToken(user.id);
    const refreshToken = await createRefreshToken(user.id);

    res.cookie('refreshToken', refreshToken, {
        maxAge : 90 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    })
    res.status(200).json({user, tokn : accessToken});
});

export { login };
