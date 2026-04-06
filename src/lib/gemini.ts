// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Use environment variable for model selection
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.0-flash" });

export async function askGemini(prompt: string, history: { role: string; message: string }[]) {
  const chat = model.startChat({
    history: history.map(h => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.message }],
    })),
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
}