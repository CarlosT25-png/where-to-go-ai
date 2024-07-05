"use server"
import { supabase } from "@/utils/supabase/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const sendVerificationEmail = async (email: string) => {
  "use server"
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  })

  if(error){
    redirect('/signup?message='+error.message)
  }
  revalidatePath('/', 'layout')
  redirect('/signup/pending-email-verification?message=Email Verification sent!')
}