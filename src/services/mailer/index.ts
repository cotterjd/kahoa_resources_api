import { getCode } from "../uuid";

const mailer = require("nodemailer");

const transporter = mailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendMail(email) {
  const code = getCode(email);
  const link = `${process.env.APP_URL}/login?email=${email}&code=${code}`;

  return transporter.sendMail({
    from: '"Kahoa Resources" <kahoaresources@outlook.com>',
    to: email, // receiver
    subject: "Kahoa Resources Login Link",
    text: link,
  });
}
