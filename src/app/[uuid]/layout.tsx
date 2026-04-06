import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import StoreInitializer from "@/components/StoreInitializer";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

export default async function UserLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode, 
  params: Promise<{ uuid: string }> | { uuid: string } 
}) {
  // Await params if it's a promise (Next 15 standard)
  const resolvedParams = await params;
  
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  if (user.id !== resolvedParams.uuid) {
    redirect(`/${user.id}`);
  }

  return (
    <>
      <StoreInitializer uuid={user.id} />
      <ClientLayoutWrapper>
        {children}
      </ClientLayoutWrapper>
    </>
  );
}
