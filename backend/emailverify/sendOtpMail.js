import nodemailer from "nodemailer";
import "dotenv/config";

export const sendOtpMail = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false, // 🔥 fixes self-signed cert issue
      },
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password reset otp",
      html: `<p> Your OTP for password reset is:<b>${otp}</b> </p>` 
       
 
    };

    await transporter.sendMail(mailConfigurations);
    console.log(" otp sent successfully");

  } catch (error) {
    console.log(" Email sending failed:", error.message);
  }
};
