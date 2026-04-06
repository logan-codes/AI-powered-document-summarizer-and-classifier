import { createClient } from "./supabase";

export const createDraft = async () => {
  const client = createClient();
  // Get the authenticated user
  const { data: { user }, error: userError } = await client.auth.getUser();
  if (userError || !user) throw new Error("Not authenticated");

  const userId = user.id; // Auth UUID

  // Ensure the profile exists (upsert)
  const { error: profileError } = await client
    .from("profiles")
    .upsert(
      {
        id: userId,        // Primary key = Auth UUID
        email: user.email,
        username: "New User",
      },
      { onConflict: "id" } // Only insert if id does not exist
    );

  if (profileError) throw profileError;

  // Create draft linked to profile
  const { data, error } = await client
    .from("drafts")
    .insert({
      user_id: userId,         // FK referencing profiles.id
      title: "Untitled Document",
      content: "",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};
