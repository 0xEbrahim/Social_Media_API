import { PrismaClient } from "@prisma/client/edge";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

const login = asyncHandler(async (req, res, next) => {});

export { login };
