import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

export default function Chat() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const fetchChats = async () => {
    try {
      const res = await API.get(`/chat/${docId}`);
      setChats(res.data);
    } catch (err) {
      toast.error("Failed to load chat history");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await API.post(`/chat/${docId}`, { message });
      setChats((prev) => [...prev, res.data]);
      setMessage("");
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [docId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 font-[Inter]">
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto w-full p-6 flex flex-col flex-1">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition-all"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-800 tracking-wide">
          💬 Chat with AI Assistant
        </h2>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-5 border rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm space-y-4">
          {chats.map((chat) => (
            <div key={chat._id} className="flex flex-col space-y-2">
              {/* User Message */}
              {chat.userMessage && (
                <div className="self-end bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-2xl max-w-xs break-words shadow-md font-medium text-sm">
                  👤 {chat.userMessage}
                </div>
              )}
              {/* AI Response */}
              {chat.aiResponse && (
                <div className="self-start bg-gray-100 border border-gray-200 text-gray-900 px-4 py-2 rounded-2xl max-w-xs break-words shadow-sm font-serif italic text-sm">
                  🤖 {chat.aiResponse}
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <form onSubmit={sendMessage} className="flex gap-2 mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-light"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all disabled:bg-indigo-400"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
