import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { login } from "./actions";
import { FiChevronLeft } from "react-icons/fi";

export default async function LoginForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Link
          href={"/"}
          aria-label="Go back button"
          className="flex items-center gap-1"
        >
          <FiChevronLeft size={'1.2rem'} /> Go back
        </Link>
        <div>
          <Image
            src="/assets/img/wheretogo.png"
            alt="Where To GO AI Logo"
            width={200}
            height={200}
            className="mx-auto rounded-lg"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary/80"
              prefetch={false}
            >
              sign up for a new account
            </Link>
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          action={login}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-3 rounded-md shadow-sm">
            <div>
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-t-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-b-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {searchParams?.message && (
            <div className="py-1 text-red-600">{searchParams.message}</div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
                className="h-4 w-4 rounded"
              />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-muted-foreground"
              >
                Remember me
              </Label>
            </div>
            <div className="text-sm">
              <Link
                href="#"
                className="font-medium text-primary hover:text-primary/80"
                prefetch={false}
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <Button formAction={login} className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
