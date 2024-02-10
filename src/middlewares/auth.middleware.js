import { PrismaClient } from "@prisma/client";
import asyncHandler from 'express-async-handler'
import APIError from '../utils/APIError.js';
import { verifyAccessToken } from '../utils/createToken.js';
const prisma = new PrismaClient();

const authMiddleware = asyncHandler(async (req, res, next) => {
    const encodedToken = req.headers['authorization'].split[1];
    if(!encodedToken)
        return next(new APIError("Token not found", 403))
    const decodedToken = await verifyAccessToken();
    const user = await prisma.user.findUnique({where : {id : decodedToken.userId}})
    if(!user)
        return next(new APIError("You are not allowed.", 401));
    req.user = user;
    next();
})

export { authMiddleware };