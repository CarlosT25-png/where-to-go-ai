"use server"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import axios from "axios";

export type SignUpObject = {
  email: string
  password: string
  token: string
}

export const login = async (formData: FormData) => {
  const supabase = createClient()
  console.log(formData.get('email'))
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if(error){
    redirect("/login?message=The Credentials are Invalid")
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export const signup = async (data: SignUpObject) => {
  const supabase = createClient()
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  const captchaStatus = await validateCaptchaToken(data.token)

  if(error){
    redirect("/signup?message=Error - Check the fields")
  }

  if(captchaStatus.status === 'error'){
    redirect("/signup?message="+captchaStatus.message)
  }

  revalidatePath('/', 'layout')
  redirect('/?toastmessage=Account Created-Please verify your Email Account')
}

const validateCaptchaToken = async (gRecaptchaToken: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;

  let res;

  try {
      res = await axios.post(
          "https://www.google.com/recaptcha/api/siteverify",
          formData,
          {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              },
          }
      );

  } catch (e) {
      return {
        status: 'error',
        message: 'Error while trying to validate reCaptcha'
      }
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
      return {
        status: 'valid',
        message: 'reCaptcha is valid'
      }
  } else {
    return {
      status: 'error',
      message: 'reCaptcha not valid'
    }
  }
}