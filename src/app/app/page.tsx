import ConversationDashboard from "@/components/Chat/ConversationDashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: { toastmessage: string }} ) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/login");
  } 
  return (
    <ConversationDashboard searchParams={searchParams} user={data.user} />
  );
}