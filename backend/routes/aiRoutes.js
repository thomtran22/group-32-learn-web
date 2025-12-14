const express = require("express");
const { sendMessageToGemini } = require("../models/geminiService");

const router = express.Router();

router.post("/ai-chat", async (req, res) => {
  try {
    const userMessage = req.body && req.body.msg;
    if (!userMessage || !userMessage.trim()) {
      return res.json({ reply: "Anh nhập nội dung trước nha 👀" });
    }

    const reply = await sendMessageToGemini(userMessage);
    return res.json({ reply });
  } catch (error) {
    console.error("AI Gemini error:", error.message);
    return res.status(500).json({ reply: "AI đang bận, Anh thử lại xíu nhé 😵" });
  }
});

module.exports = router;
