import { PrismaClient } from "@prisma/client/edge";
import asyncHandler from "express-async-handler";
const prisma = new PrismaClient();

const refresh = asyncHandler(async (req, res, next) => {});

export { refresh };
