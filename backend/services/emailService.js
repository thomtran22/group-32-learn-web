import nodemailer from "nodemailer";

const createEmailTransporter = () => {
  const mailUser = process.env.MAIL_USER;
  const mailPass = process.env.MAIL_PASS;

  if (!mailUser || !mailPass) {
    throw new Error("Missing MAIL_USER or MAIL_PASS in environment variables.");
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT || 465),
    secure:
      typeof process.env.EMAIL_SECURE === "string"
        ? process.env.EMAIL_SECURE.toLowerCase() === "true"
        : true,
    auth: { user: mailUser, pass: mailPass },
    tls: { rejectUnauthorized: false },
  });
};

const buildPasswordResetEmailHtml = (resetUrl) => {
  const safeUrl = resetUrl || "#";
  return `
  <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:24px;">
    <div style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e8e8e8;">
      <div style="padding:18px 20px; background:#111111; color:#ffffff;">
        <div style="font-size:18px; font-weight:700;">Đặt lại mật khẩu</div>
        <div style="font-size:12px; opacity:0.8; margin-top:4px;">Group 32</div>
      </div>
      <div style="padding:20px;">
        <p style="margin:0 0 12px; font-size:14px; color:#333;">
          Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản của mình.
        </p>
        <p style="margin:0 0 16px; font-size:14px; color:#333;">
          Nhấn vào nút bên dưới để tạo mật khẩu mới:
        </p>
        <div style="margin:18px 0;">
          <a href="${safeUrl}"
            style="display:inline-block;padding:12px 18px;background:#111;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;">
            Đặt lại mật khẩu
          </a>
        </div>
        <p style="margin:0 0 12px; font-size:13px; color:#666;">
          Link này sẽ hết hạn sau <b>15 phút</b>.
        </p>
        <p style="margin:0; font-size:13px; color:#666;">
          Nếu bạn không yêu cầu, hãy bỏ qua email này.
        </p>
        <hr style="border:none; border-top:1px solid #eee; margin:18px 0;" />
        <p style="margin:0; font-size:12px; color:#999;">
          Nếu nút không bấm được, copy link này vào trình duyệt:
        </p>
        <p style="margin:8px 0 0; font-size:12px; color:#111; word-break:break-all;">
          ${safeUrl}
        </p>
      </div>
    </div>
  </div>
  `;
};

export const sendPasswordResetEmail = async (toEmail, resetUrl) => {
  if (!toEmail || typeof toEmail !== "string") {
    throw new Error("Invalid recipient email (toEmail)");
  }
  if (!resetUrl || typeof resetUrl !== "string") {
    throw new Error("Missing resetUrl");
  }

  const transporter = createEmailTransporter();
  await transporter.verify();

  const fromAddress =
    process.env.MAIL_FROM ||
    `Group 32 <${process.env.MAIL_USER || "no-reply@example.com"}>`;

  const info = await transporter.sendMail({
    from: fromAddress,
    to: toEmail,
    subject: "Khôi phục mật khẩu",
    html: buildPasswordResetEmailHtml(resetUrl),
    text: `Bạn vừa yêu cầu đặt lại mật khẩu. Link (hết hạn 15 phút): ${resetUrl}`,
  });

  console.log("📨 Mail sent:", info.messageId);
  return info;
};
