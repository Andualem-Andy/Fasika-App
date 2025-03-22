exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.gmail.com", // Gmail SMTP server
        port: 465, // Gmail SMTP port (SSL)
        secure: true, // Use SSL
        auth: {
          user: env("SMTP_USER"), // Your Gmail address
          pass: env("SMTP_PASS"), // Your Gmail app password
        },
      },
      settings: {
        defaultFrom: env("EMAIL_ADDRESS_FROM"), // Your Gmail address
        defaultReplyTo: env("EMAIL_ADDRESS_REPLY"), // Your Gmail address
      },
    },
  },
});