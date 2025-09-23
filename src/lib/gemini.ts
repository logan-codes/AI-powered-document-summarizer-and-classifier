// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function askGemini(prompt: string, history: { role: string; message: string }[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chat = model.startChat({
    history: history.map(h => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.message }],
    })),
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
}
