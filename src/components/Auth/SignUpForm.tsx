"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { signup } from "./actions";
import { FormEvent } from "react";
import { useUserData } from "@/store/useUserData";
import { FiChevronLeft } from "react-icons/fi";

export default function SignUpForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { setNewUser } = useUserData();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      alert("Not available to execute reCaptcha");
      return;
    }

    const form = e.target as HTMLFormElement;

    const gRecaptchaToken = await executeRecaptcha("inquirySubmit");
    setNewUser({
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
    });
    signup({
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      token: gRecaptchaToken,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 space-y-6 bg-card rounded-xl shadow-lg">
        <Link
          href={"/"}
          aria-label="Go back button"
          className="flex items-center gap-1"
        >
          <FiChevronLeft size={"1.2rem"} /> Go back
        </Link>
        <div className="space-y-2 text-center">
          <div className="flex justify-center">
            <Image
              src="/assets/img/wheretogo.png"
              alt="Where To GO AI Logo"
              width={200}
              height={200}
              className="mx-auto rounded-lg"
            />
          </div>
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground">
            Create your account to get started.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              name="name"
              type="name"
              placeholder="Enter your name"
              required
              min={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              min={8}
            />
          </div>
          {searchParams?.message && (
            <div className="py-1 text-red-600">{searchParams.message}</div>
          )}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4"
            prefetch={false}
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
