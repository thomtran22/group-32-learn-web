import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async ({ recipientEmail, recipientName, resetLink }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 465),
    secure: (process.env.EMAIL_SECURE || "true").toLowerCase() === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  const safeName = recipientName?.trim() || "bạn";

  await transporter.sendMail({
    from: emailFrom,
    to: recipientEmail,
    subject: "Khôi phục mật khẩu",
    text: `Chào ${safeName},\n\nMở link để đặt lại mật khẩu (hết hạn sau 15 phút):\n${resetLink}\n\nNếu bạn không yêu cầu, hãy bỏ qua email này.`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <p>Chào <b>${safeName}</b>,</p>
        <p>Bạn vừa yêu cầu khôi phục mật khẩu.</p>
        <p><a href="${resetLink}">Bấm vào đây để đặt lại mật khẩu</a></p>
        <p style="color:#777">Link hết hạn sau 15 phút.</p>
      </div>
    `,
  });
};
