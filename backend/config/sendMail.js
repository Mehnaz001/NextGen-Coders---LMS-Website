import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD, // Gmail App Password
  },
});

const sendMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: "Reset Your Password",
    html: `
      <p>Your OTP for password reset is 
        <b>${otp}</b>.
      </p>
      <p>This OTP expires in 5 minutes.</p>
    `,
  });
};

export default sendMail;
