"use client";

import React, { useState } from "react";

interface AISidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  topBarHeight?: number; // height of top nav bar
}

export default function AISidebar({ isOpen, setIsOpen, topBarHeight = 64 }: AISidebarProps) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");

    // Fake AI reply
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: "This is an AI reply." }]);
    }, 500);
  };

  return (
    <div
      className={`fixed top-[${topBarHeight}px] right-0 flex flex-col transition-all duration-300 border-l shadow-lg bg-gray-100 ${
        isOpen ? "w-80" : "w-12"
      }`}
      style={{ height: `calc(100vh - ${topBarHeight}px)` }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b bg-white flex-shrink-0 p-3">
        {isOpen && <h2 className="font-bold text-sm">AI Assistant</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-gray-500 hover:text-black"
        >
          {isOpen ? "➤" : "AI"}
        </button>
      </div>

      {/* Scrollable chat messages */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded max-w-[75%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      )}

      {/* Input bar */}
      {isOpen && (
        <div className="flex-shrink-0 p-3 border-t bg-white flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI..."
            className="flex-1 border rounded p-2 text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            Send
          </button>
        </div>
      )}

      {/* Collapsed view */}
      {!isOpen && (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-2xl">
        
        </div>
      )}
    </div>
  );
}
