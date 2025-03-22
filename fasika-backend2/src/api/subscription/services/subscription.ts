"use strict";

const nodemailer = require("nodemailer");

module.exports = () => ({
  async sendEmail(to, subject, text, html) {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use SSL
        auth: {
          user: process.env.SMTP_USER, // Your Gmail
          pass: process.env.SMTP_PASS, // Your Gmail App Password
        },
      });

      let info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS_FROM,
        to,
        subject,
        text,
        html,
      });

      console.log("✅ Email sent successfully:", info.messageId);
      return info;
    } catch (error) {
      console.error("❌ Email sending failed:", error);
      throw error;
    }
  },
});
