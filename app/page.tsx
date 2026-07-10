import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) redirect('/dashboard');

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background px-6 py-16 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-8 rounded-2xl border border-border bg-card p-10 text-center shadow-sm sm:items-start sm:text-left">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Clerk is now wired into your Next.js app.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Add your Clerk keys to the environment file, then sign in through the navigation to see the user button appear.
          </p>
        </div>
      </main>
    </div>
  );
}
