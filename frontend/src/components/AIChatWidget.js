import React, { useEffect, useRef, useState } from "react";
import "../assets/css/aipopchat.css";

const ZALO_LINK = "https://zalo.me/0367444143";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  const popupRef = useRef(null);
  const fabRef = useRef(null);

  const isAskForHuman = (text) => {
    const normalizedText = (text || "").toLowerCase();
    const keywords = [
      "nói chuyện với shop",
      "chat với shop",
      "nhắn shop",
      "liên hệ shop",
      "tư vấn trực tiếp",
      "người thật",
      "zalo",
      "cho xin zalo",
      "gặp shop",
      "chốt đơn",
      "đặt hàng",
    ];
    return keywords.some((keyword) => normalizedText.includes(keyword));
  };

  useEffect(() => {
    if (open && !hasGreeted) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "Chào Anh 👋\n" +
            "Em là trợ lý của shop 360 Be Your Self.\n" +
            "Anh đang cần tư vấn quần áo đi chơi, đi làm hay dự tiệc ạ?\n\n" +
            "Nếu Anh muốn nói chuyện với shop thì nhắn Zalo tại đây nhé: " +
            ZALO_LINK,
        },
      ]);
      setHasGreeted(true);
    }
  }, [open, hasGreeted]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (!open) return;
      if (fabRef.current && fabRef.current.contains(event.target)) return;
      if (popupRef.current && popupRef.current.contains(event.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    // ✅ Nếu user muốn nói chuyện với shop → trả Zalo ngay, không gọi AI
    if (isAskForHuman(userText)) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "Dạ vâng Anh 💚 Anh nhắn trực tiếp với shop qua Zalo tại đây nhé:\n" +
            ZALO_LINK +
            "\n\nAnh gửi giúp em: nhu cầu (đi chơi/đi làm/dự tiệc) + chiều cao/cân nặng + size thường mặc để shop tư vấn nhanh ạ.",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/ai/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: userText }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "AI đang bận, thử lại nhé 😵" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleOpen = () => setOpen((prev) => !prev);

  const openZalo = () => window.open(ZALO_LINK, "_blank");

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className={`chat-fab ${open ? "is-open" : "is-idle"}`}
        onClick={toggleOpen}
      >
        💬
      </button>

      {open && (
        <div className="chat-popup" ref={popupRef}>
          <div className="chat-header">
            360 Be Your Self
            <button
              type="button"
              className="chat-close"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                {m.text}

                {/* ✅ Nếu bubble assistant có link Zalo thì show thêm nút */}
                {m.role === "assistant" && m.text.includes(ZALO_LINK) && (
                  <div style={{ marginTop: 8 }}>
                    <button className="zalo-btn" onClick={openZalo}>
                      💚 Chat Zalo với shop
                    </button>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble assistant typing">Đang trả lời...</div>
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
