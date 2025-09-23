import { NextResponse, NextRequest } from "next/server";
import { askGemini } from "@/lib/gemini";
import client from "@/lib/supabase";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ uuid: string; draftId: string }> }
) {
  const { draftId } = await context.params;
  const { message, userId } = await req.json();

  // fetch history for this draft
  const { data: history } = await client
    .from("draft_chats")
    .select("role, message")
    .eq("draft_id", draftId)
    .order("created_at", { ascending: true });

  const response = await askGemini(message, history || []);

  // save user message
  await client.from("draft_chats").insert({
    draft_id: draftId,
    user_id: userId,
    role: "user",
    message,
  });

  // save AI response
  await client.from("draft_chats").insert({
    draft_id: draftId,
    user_id: userId,
    role: "assistant",
    message: response,
  });

  return NextResponse.json({ reply: response });
}
