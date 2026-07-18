"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createLink } from "./actions";
import { Button } from "@/components/ui/button";

export default function CreateLinkDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [originalUrl, setOriginalUrl] = useState("https://");
    const [shortCode, setShortCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const result = await createLink({ originalUrl, shortCode });

        setIsSubmitting(false);

        if (result.error) {
            setError(result.error);
            return;
        }

        setOriginalUrl("https://");
        setShortCode("");
        setIsOpen(false);
        router.refresh();
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <Button
                variant="outline"
                className="w-fit gap-2"
                onClick={() => {
                    setOriginalUrl("https://");
                    setShortCode("");
                    setError(null);
                    setIsOpen(true);
                }}
            >
                Create link
            </Button>

            {isOpen
                ? createPortal(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/70 p-4">
                        <div className="relative w-full max-w-lg rounded-3xl border border-border/80 bg-card p-6 shadow-2xl z-50 max-h-[calc(100vh-4rem)] overflow-auto">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-semibold text-foreground">Create new link</h2>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Enter the URL you want to shorten and save it to your dashboard.
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() => {
                                        setOriginalUrl("https://");
                                        setShortCode("");
                                        setError(null);
                                        setIsOpen(false);
                                    }}
                                >
                                    Close
                                </Button>
                            </div>

                            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">Original URL</label>
                                    <input
                                        value={originalUrl}
                                        onChange={(event) => setOriginalUrl(event.target.value)}
                                        className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">Short code (optional)</label>
                                    <input
                                        value={shortCode}
                                        onChange={(event) => setShortCode(event.target.value)}
                                        className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        placeholder="Leave empty to auto-generate a short code"
                                    />
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Leave empty to auto-generate a short code.
                                    </p>
                                </div>

                                {error ? <p className="text-sm text-destructive">{error}</p> : null}

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => {
                                            setOriginalUrl("https://");
                                            setShortCode("");
                                            setError(null);
                                            setIsOpen(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Saving…" : "Save link"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>,
                    document.body
                )
                : null}
        </>
    );
}
