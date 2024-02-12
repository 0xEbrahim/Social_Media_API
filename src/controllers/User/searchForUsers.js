import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

export const searchForUsers = asyncHandler(async(req, res, next) => {
   
})
