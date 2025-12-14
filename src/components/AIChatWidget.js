import React, { useState } from "react";
import "../assets/css/style.css";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: userText })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "AI đang bận, thử lại nhé 😵" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔵 Chat bubble */}
      <div className="chat-fab" onClick={() => setOpen(true)}>
        💬
      </div>

      {/* 🟢 Popup chat */}
      {open && (
        <div className="chat-popup">
          <div className="chat-header">
            AI Assistant
            <span className="chat-close" onClick={() => setOpen(false)}>
              ✕
            </span>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-bubble ${m.role}`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble assistant typing">
                Đang trả lời...
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Bạn cần hỗ trợ gì?"
            />
            <button onClick={sendMessage} disabled={loading}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
