import bcrypt, { hash } from "bcrypt";
import asyncHandler from "express-async-handler";
const hashPassword = asyncHandler(async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
});

const comparePassword = asyncHandler(async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
})
export { hashPassword, comparePassword };
