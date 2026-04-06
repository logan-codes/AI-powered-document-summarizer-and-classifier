"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import { marked } from "marked";

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
    { role: "user" | "assistant"; message: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // Load chat history
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("draft_chats")
        .select("role, message")
        .eq("draft_id", draftId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }
      setMessages(data as { role: "user" | "assistant"; message: string }[]);
    };

    fetchMessages();
  }, [draftId, supabase]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userTyped = input.trim();
    const chatContext = selectedText?.trim() || "";

    // Optimistically update UI
    setMessages((prev) => [...prev, { role: "user", message: userTyped }]);
    setInput("");
    setLoading(true);

    try {
      const currentPath = window.location.pathname;
      const chatEndpoint = `${currentPath}/chat`;

      const res = await fetch(chatEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userTyped,
          userId,
          context: chatContext,
        }),
      });

      if (!res.ok) throw new Error("Failed to get AI response");
      
      const { reply } = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", message: reply }]);

    } catch (err) {
      console.error("AI error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed right-0 flex flex-col transition-all duration-300 z-40 ${
        isOpen 
          ? "border-l border-border shadow-2xl bg-sidebar max-lg:!w-[300px] max-lg:max-w-[85vw]" 
          : "w-12 max-lg:!bg-transparent max-lg:shadow-none max-lg:border-0 border-l border-border shadow-lg bg-sidebar"
      }`}
      style={{
        top: `${topBarHeight}px`,
        height: `calc(100vh - ${topBarHeight}px)`,
        width: isOpen ? width : 48,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border bg-card flex-shrink-0 p-3 transition-colors">
        {isOpen && <h2 className="font-bold text-sm text-card-foreground">AI Assistant</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
              className={`p-3 rounded-lg max-w-[85%] shadow-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground self-end"
                  : "bg-card text-card-foreground self-start border border-border"
              }`}
            >
              <div className={`text-sm ${msg.role === "assistant" ? "prose dark:prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-muted prose-pre:text-foreground" : ""}`}>
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.message}</ReactMarkdown>
                ) : (
                  <div className="whitespace-pre-wrap">{msg.message}</div>
                )}
              </div>
              {msg.role === "assistant" && (
                <div className="mt-3 flex gap-3 text-xs font-medium border-t border-border pt-2">
                  <button
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => navigator.clipboard.writeText(msg.message)}
                    title="Copy"
                  >
                    Copy
                  </button>
                  {editorApi && (
                    <button
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={async () => {
                        const html = await marked.parse(msg.message);
                        editorApi.replaceSelection(html);
                      }}
                      title="Apply to document"
                    >
                      Apply to Doc
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="p-2 rounded-lg bg-muted text-muted-foreground self-start text-sm animate-pulse border border-border">
              AI is typing…
            </div>
          )}
        </div>
      )}

      {/* Input */}
      {isOpen && (
        <div className="flex-shrink-0 p-4 border-t border-border bg-card flex gap-2 items-end shadow-sm z-10 w-full relative transition-colors">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            placeholder="Ask AI..."
            rows={1}
            className="flex-1 border border-input rounded-xl p-3 text-sm resize-none max-h-[160px] overflow-y-auto focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground transition-all"
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
            className="bg-primary text-primary-foreground px-4 h-[46px] rounded-xl disabled:opacity-50 hover:opacity-90 font-semibold flex items-center justify-center transition-opacity shadow-sm"
          >
            Send
          </button>
        </div>
      )}

      {!isOpen && (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs -rotate-90">
          AI
        </div>
      )}
    </div>
  );
}
