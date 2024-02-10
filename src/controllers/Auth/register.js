import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { hashPassword } from "../../utils/hashingPassword.js";
const prisma = new PrismaClient();

/**
 * @desc    users create new acount
 * @method  post
 * @route   /api/v1/auth/register
 * @access  public
 */
const register = asyncHandler(async (req, res, next) => {
    const {firstName , lastName , email , password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPassword,
      },
    });
    res.json(user) 
});

export { register };
