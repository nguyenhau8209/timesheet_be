import nodemailer from "nodemailer";
import getAccessTokenGoogle from "./googleAuth.js";
import dotenv from "dotenv";
dotenv.config();
const nodeMailerLib = async ({ to, subject, text, from }, callback) => {
  console.log("--vao gui mailll--");
  const accessToken = await getAccessTokenGoogle();
  console.log("accessToken ", accessToken);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  const mailOptions = {
    to,
    subject,
    html: `<div>
    <h3>${text}</h3>
    <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" />
    </div>`,
    from,
  };
  // console.log("transporter ", transporter);
  await transporter.sendMail(mailOptions, callback);
};

export default nodeMailerLib;
