import { PrismaClient } from "@prisma/client/edge";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

const logout = asyncHandler(async (req, res, next) => {});

export { logout };
