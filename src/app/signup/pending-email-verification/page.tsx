"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useUserData } from "@/store/useUserData"
import { sendVerificationEmail } from "./actions"
import { redirect } from "next/navigation"

export default function Component() {
  const {name, email, initials} = useUserData()

  if(email === '') redirect('/signup')

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    await sendVerificationEmail(email)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Verify Your Email</h1>
          <p className="mt-2 text-muted-foreground">
            Please verify your email address to start using the AI-powered itinerary generation feature.
          </p>
        </div>
        <div className="bg-card rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" disabled>
              Change
            </Button>
          </div>
          <div>
            <p className="text-muted-foreground">
              {"We've sent a verification email to your inbox. Please check your email and click the verification link to continue."}
            </p>
          </div>
          <Button className="w-full" onClick={handleSubmit}>Resend Verification Email</Button>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          If you have any issues, please contact our support team.
        </div>
      </div>
    </div>
  )
}