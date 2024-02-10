import { PrismaClient } from "@prisma/client/edge";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

const register = asyncHandler(async (req, res, next) => {
    const {firstName , lastName , email , password } = req.body;
    
});

export { register };
