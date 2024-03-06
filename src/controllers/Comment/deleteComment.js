import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
const prisma = new PrismaClient();

const deleteComment = asyncHandler(async (req, res, next) => {});

export { deleteComment };
