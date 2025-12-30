import nodemailer from "nodemailer";

function getBooleanFromEnvironment(value, defaultValue = false) {
  if (value === undefined || value === null) return defaultValue;
  const normalizedValue = String(value).trim().toLowerCase();
  return normalizedValue === "true" || normalizedValue === "1" || normalizedValue === "yes";
}

function getNumberFromEnvironment(value, defaultValue) {
  const parsedNumber = Number(value);
  return Number.isFinite(parsedNumber) ? parsedNumber : defaultValue;
}

const smtpHost = process.env.EMAIL_HOST || "smtp.gmail.com";
const smtpPort = getNumberFromEnvironment(process.env.EMAIL_PORT, 587);
const smtpSecure = getBooleanFromEnvironment(process.env.EMAIL_SECURE, false);

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailFrom = process.env.EMAIL_FROM || emailUser;

if (!emailUser || !emailPass) {
  console.error("Missing EMAIL_USER or EMAIL_PASS in environment variables.");
}

const mailTransporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort, // ✅ 587
  secure: smtpSecure, // ✅ false for 587
  auth: {
    user: emailUser,
    pass: emailPass, // ✅ Gmail App Password
  },
  // Helpful timeouts for cloud deploys
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 10_000,

  // STARTTLS settings
  requireTLS: true,

  // Some environments can be picky; this helps avoid TLS handshake surprises
  tls: {
    minVersion: "TLSv1.2",
  },
});

export async function sendPasswordResetEmail(recipientEmail, resetUrl) {
  if (!recipientEmail) {
    throw new Error("recipientEmail is required");
  }
  if (!resetUrl) {
    throw new Error("resetUrl is required");
  }

  // Optional: verify connection once (can be removed if you want)
  // await mailTransporter.verify();

  const subject = "Khôi phục mật khẩu";
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Khôi phục mật khẩu</h2>
      <p>Anh vừa yêu cầu đặt lại mật khẩu.</p>
      <p>Bấm vào nút bên dưới để đặt lại mật khẩu (link có hiệu lực 15 phút):</p>
      <p>
        <a href="${resetUrl}"
           style="display:inline-block;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:8px;">
          Đặt lại mật khẩu
        </a>
      </p>
      <p>Nếu nút không bấm được, copy link sau vào trình duyệt:</p>
      <p style="word-break: break-all;">${resetUrl}</p>
      <p>Nếu không phải Anh yêu cầu, có thể bỏ qua email này.</p>
    </div>
  `;

  const mailOptions = {
    from: emailFrom,
    to: recipientEmail,
    subject: subject,
    html: htmlContent,
  };

  return await mailTransporter.sendMail(mailOptions);
}