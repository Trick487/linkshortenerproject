import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { BarChart3, Link2, ShieldCheck, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const features: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
    {
      title: "Shorten in seconds",
      description: "Turn long, messy URLs into clean links that are ready to share across any channel.",
      icon: Link2,
    },
    {
      title: "Organize your links",
      description: "Keep every campaign, product launch, or social post neatly grouped in your personal dashboard.",
      icon: Sparkles,
    },
    {
      title: "Track performance",
      description: "Monitor clicks and engagement so your links keep working hard for your audience.",
      icon: BarChart3,
    },
    {
      title: "Stay secure",
      description: "Clerk-powered sign in keeps your workspace protected while the experience stays simple.",
      icon: ShieldCheck,
    },
  ];

export default async function Home() {
  const { userId } = await auth();

  if (userId) redirect("/dashboard");

  return (
    <div className="flex flex-1 flex-col bg-background">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <section className="grid gap-8 rounded-3xl border border-border/80 bg-card/80 p-8 shadow-sm backdrop-blur sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Fast, polished link sharing
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Turn long URLs into memorable, high-impact links.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Create short links, keep your campaigns organized, and share with confidence from a clean dashboard built for modern teams.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <SignUpButton mode="modal" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <SignInButton mode="modal" />
              </Button>
            </div>
            <ul className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-primary" />
                Clean short links
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure sign-in
              </li>
              <li className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Simple analytics
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/95 p-6 shadow-inner">
            <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
              <p className="text-sm font-medium text-muted-foreground">Preview</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-background px-4 py-3 shadow-sm">
                  <div>
                    <p className="font-medium text-foreground">short.ly/launch</p>
                    <p className="text-sm text-muted-foreground">Your latest campaign link</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    Live
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border/70 bg-background p-3">
                    <p className="text-2xl font-semibold text-foreground">1.2K</p>
                    <p className="text-sm text-muted-foreground">Clicks this month</p>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-background p-3">
                    <p className="text-2xl font-semibold text-foreground">24</p>
                    <p className="text-sm text-muted-foreground">Links saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{feature.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{feature.description}</p>
              </article>
            );
          })}
        </section>

        <section className="flex flex-col gap-4 rounded-3xl border border-border/80 bg-muted/30 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Ready to share links that look as good as your content?
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Start with a free account and turn every link into a polished part of your brand.
            </p>
          </div>
          <Button size="lg" asChild>
            <SignUpButton mode="modal" />
          </Button>
        </section>
      </main>
    </div>
  );
}
