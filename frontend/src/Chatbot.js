import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
  if (!query.trim()) return;

  const userMsg = { role: "user", text: query };

  // User message add
  setMessages(prev => [...prev, userMsg]);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/search",
      { query }
    );

    const botMsg = {
      role: "bot",
      text: res.data.answer || "No response from AI"
    };

    setMessages(prev => [...prev, botMsg]);
    setQuery("");

  } catch (err) {
    console.error("API Error:", err);

    setMessages(prev => [
      ...prev,
      { role: "bot", text: "Error getting response." }
    ]);
  }
};

  return (
    <div style={{ padding: 20 }}>
      <h2>OpsMind AI Chatbot</h2>

      <div style={{ minHeight: 300, border: "1px solid #ccc", padding: 10 }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.role}:</b> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Ask SOP question..."
        style={{ width: "70%", padding: 8 }}
      />

      <button onClick={sendMessage} style={{ padding: 8 }}>
        Send
      </button>
    </div>
  );
}

export default Chatbot;