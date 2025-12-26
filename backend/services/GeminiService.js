import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const aiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_INSTRUCTION = `
Bạn là trợ lý AI của một shop quần áo.
Luôn trả lời bằng TIẾNG VIỆT, giọng thân thiện, ngắn gọn, tư vấn rõ ràng.
Nhiệm vụ: tư vấn chọn đồ theo giới tính, độ tuổi, dịp mặc, phong cách, màu sắc, size; gợi ý phối đồ; hỏi lại khi thiếu thông tin.
Không nhắc về chính sách hay kỹ thuật AI; không trả lời bằng tiếng Anh.
`;

export async function sendMessageToGemini(message) {
  const response = await aiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
      { role: "user", parts: [{ text: message }] },
    ],
  });

  if (typeof response.text === "function") return response.text();
  if (typeof response.text === "string") return response.text;

  const fallback =
    response?.candidates?.[0]?.content?.parts?.map(p => p?.text ?? "").join("") ?? "";
  return fallback || "";
}
