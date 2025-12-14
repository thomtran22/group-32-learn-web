const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function sendMessageToGemini(userMessage) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    // ✅ ÉP nói tiếng Việt
    systemInstruction: "Bạn là trợ lý AI. Luôn trả lời bằng tiếng Việt. Ngắn gọn, dễ hiểu.",

    // Nội dung user
    contents: userMessage
  });

  return response.text || "Không có phản hồi";
}

module.exports = { sendMessageToGemini };
