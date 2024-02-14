import nodeMailer from "nodemailer";
import asyncHandler from "express-async-handler";
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_APP_EMAIL,
    pass: process.env.MAILER_APP_PASSWORD,
  },
});

const sendEmailToUser = asyncHandler(async (info) => {
  const send = await transporter.sendMail({
    from: info.from, // sender address
    to: info.to, // list of receivers
    subject: info.subject, // Subject line
    text: info.text, // plain text body
    html: info.htm, // html body
  });
  console.log("Message ID : => ", send.messageId);
});

export { sendEmailToUser };
