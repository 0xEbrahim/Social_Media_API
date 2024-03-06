import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import APIError from "../../utils/APIError.js";
import { comparePassword } from "../../utils/hashingPassword.js";
import {
  createAccessToken,
  createRefreshToken,
} from "../../utils/createToken.js";
import { sendEmailToUser } from "../../functions/Mail/email.config.js";
const prisma = new PrismaClient();

/**
 * @desc    Users use email and password to login
 * @method  post
 * @route   /api/v1/auth/login
 * @access  public
 */
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) return next(new APIError("Wrong email or password.", 400));
  const matchedPasswords = await comparePassword(password, user.password);
  if (!matchedPasswords)
    return next(new APIError("Wrong email or password.", 400));
  if (!user.emailVerified) {
    const plainVerfiyToken = crypto.randomBytes(64).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(plainVerfiyToken)
      .digest("hex");
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        emailVerificationToken: hashedToken,
      },
    });
    const info = {
      from: `Mailer Company`,
      to: email,
      subject: "Email verfication",
      text: "Verfiy you email",
      htm: `<h1>Email verfication </h1>
          <p>Hello ${user.name}, Please follow this link to verfiy your account. </p><a href= 'http://localhost:3000/api/v1/auth/verfiy/${plainVerfiyToken}'> Click link </a>
          <p>If you did not verfiy your account you won't be able to use a lot of website features</p>`,
    };
    await sendEmailToUser(info);
    return next(
      new APIError(
        "You didn't verfiy you account, yet. please follow the link sent to your email to verfiy"
      )
    );
  }
  const accessToken = await createAccessToken(user.id);
  const refreshToken = await createRefreshToken(user.id);

  res.cookie("refreshToken", refreshToken, {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).json({ user, tokn: accessToken });
});

export { login };
