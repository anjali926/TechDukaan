// import nodemailer from "nodemailer";
// import "dotenv/config";

// export const verifyEmail =  (token, email) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });
//   const mailConfigurations = {
//     // It should be a string of sender/server email
//     from: process.env.EMAIL_USER ,

//     to: email ,

//     // Subject of Email
//     subject: "Email Verification",

//     // This would be the text of email body
//     text: `Hi! There, You have recently visited 
//            our website and entered your email.
//            Please follow the given link to verify your email
//            http://localhost:5173/verify/${token} 
//            Thanks`,
//   };
//     transporter.sendMail(mailConfigurations, function (error, info) {
//     if (error) throw Error(error);
//     console.log("Email Sent Successfully");
//     console.log(info);
//   });
// };



import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = async (token, email) => {
  try {
    console.log("CLIENT_URL:", process.env.CLIENT_URL);
    console.log("MAIL_USER:", process.env.MAIL_USER);

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
      subject: "Email Verification",
      text: `Hi there 

You recently signed up on our website.
Please click the link below to verify your email:

 ${process.env.CLIENT_URL}/verify/${token}

Thanks,
TechDukaan Team`,
    };

    await transporter.sendMail(mailConfigurations);
    console.log(" Verification email sent successfully");

  } catch (error) {
    console.log(" Email sending failed:", error.message);
  }
};
