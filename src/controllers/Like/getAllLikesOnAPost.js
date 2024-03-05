import {PrismaClient} from '@prisma/client'
import asyncHandler from 'express-async-handler'
const prisma = new PrismaClient();

const getAllLikes = asyncHandler(async(req, res, next) => {

})

export {getAllLikes}