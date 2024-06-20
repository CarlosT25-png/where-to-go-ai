"use server"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const sendVerificationEmail = async (email: string) => {
  "use server"
  const supabase = createClient()
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