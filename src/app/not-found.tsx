import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <Image
          src="/assets/img/wheretogo.png"
          alt="Where To GO AI Logo"
          width={200}
          height={200}
          className="mx-auto rounded-lg"
        />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {"Oops, looks like you've lost your way!"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {"Don't worry, it happens to the best of us. Let's get you back on track and continue planning your amazing trip."}
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
