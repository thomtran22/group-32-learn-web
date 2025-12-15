import React, { useState } from "react";
import { ChatBotWidget } from "chatbot-widget-ui";
import "../assets/css/login.css";

export default function AIChatWidget() {
  const [messages, setMessages] = useState([]);

  const callApi = async (userMessage) => {
    const res = await fetch("/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: userMessage }),
    });

    const data = await res.json();
    return data.reply;
  };

  const handleNewMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleBotResponse = (botMsg) => {
    setMessages((prev) => [...prev, { role: "assistant", content: botMsg }]);
  };

  return (
    <ChatBotWidget
      callApi={callApi}
      onBotResponse={handleBotResponse}
      handleNewMessage={handleNewMessage}
      messages={messages}
      chatbotName="AI Assistant"
      primaryColor="#0bb24eff"
      inputMsgPlaceholder="Bạn cần hỗ trợ gì"
    />
  );
}