import React, { useState, useEffect, useRef } from "react";
import API from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaRobot } from "react-icons/fa";

export default function ChatWindow({ document }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Fetch chat history
  const fetchHistory = async () => {
    try {
      const res = await API.get(`/chat/${document._id}`);
      setMessages(res.data);
    } catch (err) {
      toast.error("Failed to fetch chat history");
    }
  };

  useEffect(() => {
    if (document) fetchHistory();
  }, [document]);

  // Auto-scroll to bottom on message update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setLoading(true);
      const res = await API.post(`/chat/${document._id}`, { message: input });
      setMessages((prev) => [...prev, res.data]);
      setInput("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  if (!document)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        📄 Select a document to start chatting
      </p>
    );

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-lg p-4">
      <Toaster position="top-right" />
      <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">
        💬 Chat with Document
      </h2>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 rounded-lg border bg-white shadow-inner">
        {messages.map((msg, index) => (
          <div key={msg._id || index} className="flex flex-col space-y-2">
            {/* Human message */}
            {msg.userMessage && (
              <div className="flex justify-end items-start space-x-2">
                <div className="flex flex-col items-end">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-none max-w-sm shadow-md">
                    {msg.userMessage}
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-700 p-2 rounded-full shadow-sm">
                  <FaUser />
                </div>
              </div>
            )}

            {/* AI response */}
            {msg.aiResponse && (
              <div className="flex justify-start items-start space-x-2">
                <div className="bg-gray-100 text-gray-800 p-2 rounded-full shadow-sm">
                  <FaRobot />
                </div>
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none max-w-sm shadow-md">
                  {msg.aiResponse}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Field */}
      <form
        onSubmit={sendMessage}
        className="mt-4 flex gap-3 border-t border-gray-200 pt-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2 rounded-xl font-medium text-white shadow-md transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
