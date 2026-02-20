import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";

function Chatbot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMsg = { role: "user", text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/search",
        { query }
      );

      const botMsg = {
        role: "bot",
        text: res.data.answer
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Error getting response." }
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={dark ? "app-layout dark" : "app-layout"}>
      
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>OpsMind AI</h2>
        <ul>
          <li>HR SOP</li>
          <li>Finance SOP</li>
          <li>Tech SOP</li>
        </ul>

        <button
          className="toggle-btn"
          onClick={() => setDark(!dark)}
        >
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </aside>

      {/* Chat Section */}
      <main className="chat-section">
        <div className="chat-wrapper">

          <div className="chat-header">
            Enterprise SOP Assistant
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${msg.role}`}
              >
                <ReactMarkdown>
                  {msg.text}
                </ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div className="message bot typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          <div className="chat-input">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask about SOP..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>
              Send
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Chatbot;