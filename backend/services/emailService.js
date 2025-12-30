import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email, resetUrl) {
  return await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Khôi phục mật khẩu",
    html: `
      <h2>Khôi phục mật khẩu</h2>
      <p>Bấm link bên dưới để đặt lại mật khẩu (15 phút):</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Nếu không phải Anh yêu cầu, hãy bỏ qua email này.</p>
    `,
  });
}