import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Chat() {

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const { user, logout } = useContext(AuthContext);

  // Load history when button clicked
  const loadChatHistory = () => {
    const savedChats = localStorage.getItem(`chat_${user?.email}`);

    if (savedChats) {
      setMessages(JSON.parse(savedChats));
    } else {
      alert("No previous chats found");
    }
  };

  // Save history
  useEffect(() => {
    if (user) {
      localStorage.setItem(`chat_${user.email}`, JSON.stringify(messages));
    }
  }, [messages, user]);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", text: query };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/search", {
        query,
      });

      const botMessage = {
        role: "bot",
        text: res.data.answer,
        citation: res.data.citation,
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error getting response." },
      ]);
    }

    setLoading(false);
  };

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(`chat_${user?.email}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 flex flex-col">

        <h2 className="text-2xl font-bold mb-10">
          OpsMind AI
        </h2>

        <button className="mb-4 text-left hover:text-blue-400">
          📄 Documents
        </button>

        <button
          onClick={loadChatHistory}
          className="mb-4 text-left hover:text-blue-400"
        >
          🕘 Chat History
        </button>

        <div className="mt-auto space-y-3">

          <button
            onClick={clearChat}
            className="bg-red-500 px-3 py-1 rounded text-sm"
          >
            Clear Chat
          </button>
&nbsp;&nbsp;
          <button
            onClick={logout}
            className="text-red-400 hover:text-red-600"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <div className="bg-white shadow p-4 font-semibold">
          Enterprise SOP Assistant
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xl p-4 rounded-xl ${
                msg.role === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-white shadow"
              }`}
            >
              <p>{msg.text}</p>

              {msg.citation && (
                <div className="text-xs text-gray-500 mt-2">
                  📄 {msg.citation.document} | Page {msg.citation.page}
                </div>
              )}

            </div>
          ))}

          {loading && (
            <div className="bg-white shadow p-4 rounded-xl w-24">
              Typing...
            </div>
          )}

          <div ref={chatEndRef}></div>

        </div>

        {/* Input */}
        <div className="bg-white border-t p-4 flex">

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about SOP..."
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={sendMessage}
            className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}

export default Chat;