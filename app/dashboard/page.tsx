import { auth } from "@clerk/nextjs/server";
import { ExternalLink, Link2 } from "lucide-react";
import { redirect } from "next/navigation";

import CreateLinkDialog from "./CreateLinkDialog";
import LinkActions from "./LinkActions";
import { getLinksByUserId } from "@/data/links";

const dateFormatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
});

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const links = await getLinksByUserId(userId);

    return (
        <div className="flex flex-1 flex-col bg-background">
            <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-8 sm:px-8 lg:px-10">
                <section className="rounded-3xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                <Link2 className="h-4 w-4" />
                                Your workspace
                            </div>
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                                Your saved links
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Review the short links tied to your current Clerk account.
                            </p>
                        </div>

                        <CreateLinkDialog />
                    </div>
                </section>

                <section className="rounded-3xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">Recent links</h2>
                            <p className="text-sm text-muted-foreground">
                                {links.length} item{links.length === 1 ? "" : "s"} in your dashboard
                            </p>
                        </div>
                    </div>

                    {links.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-8 text-center">
                            <p className="text-base font-medium text-foreground">No links yet</p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Your saved short links will show up here as soon as they are created.
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li
                                    key={link.id}
                                    className="rounded-2xl border border-border/70 bg-background/90 p-4 shadow-sm"
                                >
                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                        <div className="min-w-0 space-y-1">
                                            <p className="truncate text-sm font-semibold text-foreground">
                                                {link.originalUrl}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                                                    short.ly/{link.shortCode}
                                                </span>
                                                <span>Created {dateFormatter.format(link.createdAt)}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-start gap-3 sm:items-end">
                                            <a
                                                href={link.originalUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                                            >
                                                Open link
                                                <ExternalLink className="h-4 w-4" />
                                            </a>

                                            <LinkActions link={link} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </div>
    );
}
