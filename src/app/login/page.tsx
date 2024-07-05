import LoginForm from "@/components/Auth/LoginForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Page = async ({ searchParams }: { searchParams: { message: string }}) => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/app");
  }

  return (
    <LoginForm searchParams={searchParams} />
  );
}

export default Page;