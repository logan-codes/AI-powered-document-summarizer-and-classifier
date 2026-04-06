import { NextResponse, NextRequest } from "next/server";
import { askGemini } from "@/lib/gemini";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ uuid: string; draftId: string }> }
) {
  const { draftId } = await context.params;
  const { message, userId, context: chatContext } = await req.json();

  const client = await createServerSupabaseClient();

  // fetch history for this draft
  const { data: history } = await client
    .from("draft_chats")
    .select("role, message")
    .eq("draft_id", draftId)
    .order("created_at", { ascending: true });

  const constructedPrompt = chatContext ? `${message}\n\nContext: \n${chatContext}` : message;
  const response = await askGemini(constructedPrompt, history || []);

  // save user message and AI response in a single batch
  const { error } = await client.from("draft_chats").insert([
    {
      draft_id: draftId,
      user_id: userId,
      role: "user",
      message,
      context: chatContext,
    },
    {
      draft_id: draftId,
      user_id: userId,
      role: "assistant",
      message: response,
    }
  ]);

  if (error) {
    console.error("Error saving chat history:", error);
    // Even if saving fails, return the response to the user
  }

  return NextResponse.json({ reply: response });
}
