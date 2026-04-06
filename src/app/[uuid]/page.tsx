import { createServerSupabaseClient } from "@/lib/supabase/server";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage({ 
  params 
}: { 
  params: Promise<{ uuid: string }>
}) {
  const resolvedParams = await params;
  const { uuid } = resolvedParams;
  
  if (uuid === "favicon.ico") return null;
  
  const supabase = await createServerSupabaseClient();
  
  // Pre-fetch drafts on the server
  const { data: drafts, error } = await supabase
    .from("drafts")
    .select("*")
    .eq("user_id", uuid)
    .order("last_edited", { ascending: false });

  if (error) {
    console.error("Error pre-fetching drafts:", error);
  }

  // Pass initial SSR-ed drafts to the client component for reactivity
  return <DashboardClient initialDrafts={drafts || []} uuid={uuid} />;
}
