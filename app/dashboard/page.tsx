import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { ArrowUpRight, Clock3, Link2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { links } from "@/db/schema";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) redirect("/");

    const userLinks = await db
        .select()
        .from(links)
        .where(eq(links.userId, userId))
        .orderBy(desc(links.createdAt));

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10 sm:px-8 lg:px-10">
            <section className="rounded-3xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-primary">Your links</p>
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
                    </div>
                    <div className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground">
                        {userLinks.length} saved {userLinks.length === 1 ? "link" : "links"}
                    </div>
                </div>

                {userLinks.length === 0 ? (
                    <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
                        <p className="text-lg font-medium text-foreground">No links yet</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Create your first short link from the homepage and it will appear here.
                        </p>
                    </div>
                ) : (
                    <ul className="mt-6 grid gap-3">
                        {userLinks.map((link) => (
                            <li
                                key={link.id}
                                className="rounded-2xl border border-border/70 bg-background p-4 shadow-sm"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0 space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                            <Link2 className="h-4 w-4" />
                                            <span>{link.shortCode}</span>
                                        </div>
                                        <a
                                            href={link.originalUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block truncate text-base font-medium text-foreground transition-colors hover:text-primary"
                                        >
                                            {link.originalUrl}
                                        </a>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock3 className="h-4 w-4" />
                                            <span>
                                                {new Date(link.createdAt).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <Button variant="outline" size="sm" asChild>
                                        <a href={link.originalUrl} target="_blank" rel="noreferrer">
                                            Open
                                            <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
