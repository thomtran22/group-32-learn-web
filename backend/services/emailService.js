import 'dotenv/config'; 
import nodemailer from "nodemailer";
import { google } from "googleapis";
const rt = process.env.MAIL_REFRESH_TOKEN;
console.log("Check Refresh Token:", rt ? `${rt.substring(0, 10)}...` : "UNDEFINED ❌");

const CLIENT_ID = process.env.MAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
const SENDER_EMAIL = process.env.MAIL_SENDER_EMAIL;

if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
  throw new Error("Thiếu cấu hình OAuth2 trong file .env");
}

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendPasswordResetEmail(recipientEmail, resetUrl) {
  if (!recipientEmail) throw new Error("recipientEmail is required");
  if (!resetUrl) throw new Error("resetUrl is required");

  try {
    // Lấy Access Token
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      port: 587,              
      secure: false,        
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
      tls: {
        rejectUnauthorized: false 
      },
      family: 4 // 
    });

    const mailOptions = {
      from: `"ShopWeb Support" <${SENDER_EMAIL}>`,
      to: recipientEmail,
      subject: "Khôi phục mật khẩu",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Khôi phục mật khẩu</h2>
          <p>Bấm vào nút bên dưới để đặt lại mật khẩu (link có hiệu lực 15 phút):</p>
          <a href="${resetUrl}" style="background:#000;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">Đặt lại mật khẩu</a>
          <p>Hoặc copy link: ${resetUrl}</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result.messageId);
    return result;

  } catch (error) {
    console.error("Lỗi gửi email:", error);
    throw error;
  }
}