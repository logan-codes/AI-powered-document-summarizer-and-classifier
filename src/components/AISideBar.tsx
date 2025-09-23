"use client";

import React, { useState, useEffect } from "react";
import client from "@/lib/supabase";
import { askGemini } from "@/lib/gemini";

interface AISidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  topBarHeight?: number;
  draftId: string;
  userId: string;             
  selectedText?: string;    
  width?: number;
  editorApi?: { replaceSelection: (html: string) => void; insertAtCursor: (html: string) => void };
}

export default function AISidebar({
  isOpen,
  setIsOpen,
  topBarHeight = 64,
  draftId,
  userId,
  selectedText,
  width = 320,
  editorApi,
}: AISidebarProps) {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; message: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load chat history
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await client
        .from("draft_chats")
        .select("role, message")
        .eq("draft_id", draftId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }
      setMessages(data as { role: "user" | "ai"; message: string }[]);
    };

    fetchMessages();
  }, [draftId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userTyped = input.trim();
    const context = selectedText?.trim() || "";

    // optimistic: show only what user typed
    setMessages((prev) => [...prev, { role: "user", message: userTyped }]);
    setInput("");

    await client.from("draft_chats").insert({
      draft_id: draftId,
      user_id: userId,
      role: "user",
      message: userTyped,
      context,
    });

    setLoading(true);
    try {
      const constructed = context ? `${userTyped}\n\nContext: \n${context}` : userTyped;
      const reply = await askGemini(constructed, messages);

      setMessages((prev) => [...prev, { role: "ai", message: reply }]);

      await client.from("draft_chats").insert({
        draft_id: draftId,
        user_id: userId,
        role: "assistant",
        message: reply,
      });

    } catch (err) {
      console.error("AI error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed right-0 flex flex-col border-l shadow-lg bg-gray-100 transition-all duration-300 ${
        isOpen ? "" : "w-12"
      }`}
      style={{
        top: `${topBarHeight}px`,
        height: `calc(100vh - ${topBarHeight}px)`,
        width: isOpen ? width : 48,
      }}
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

      {/* Messages */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2 flex flex-col">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded max-w-[75%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{msg.message}</div>
              {msg.role === "ai" && (
                <div className="mt-1 flex gap-2 text-xs">
                  <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => navigator.clipboard.writeText(msg.message)}
                    title="Copy"
                  >
                    Copy
                  </button>
                  {editorApi && (
                    <button
                      className="text-gray-600 hover:text-black"
                      onClick={() => editorApi.replaceSelection(msg.message)}
                      title="Apply to document"
                    >
                      Apply
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="p-2 rounded bg-gray-200 text-gray-500 self-start text-sm animate-pulse">
              AI is typing…
            </div>
          )}
        </div>
      )}

      {/* Input */}
      {isOpen && (
        <div className="flex-shrink-0 p-3 border-t bg-white flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI..."
            className="flex-1 border rounded p-2 text-sm"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-50"
          >
            Send
          </button>
        </div>
      )}

      {!isOpen && (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-xs -rotate-90">
          AI
        </div>
      )}
    </div>
  );
}
