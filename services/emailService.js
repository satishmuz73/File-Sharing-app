const nodemailer = require("nodemailer");

async function sendMail({ from, to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
    //   service: "gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
    //   secure: false, // Set true if using port 465 for SSL
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `inShare <${from}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent successfully:", info);
    return info;
  } catch (error) {
    console.error("Error occurred while sending email:", error.message);
    throw new Error(
      "Unable to send email. Please check the provided details or SMTP configuration."
    );
  }
}

module.exports = sendMail;
