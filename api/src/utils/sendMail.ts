import nodemailer from "nodemailer";
import fs from "fs";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async () => {
  const emailTemplate = fs.readFileSync("emailTemplate.html", "utf8");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "brooke.gorczany@ethereal.email",
      pass: "JzXDVdBghRNxAa9SDh",
    },
  });

  const mailOptions: MailOptions = {
    from: "brooke.gorczany@ethereal.email",
    to: "kkumarr.dev@gmail.com",
    subject: "Hello from Node.js",
    html: emailTemplate.replace("{{ name }}", "Recipient Name"),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
