"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Trash2 } from "lucide-react";
import { updateLink, deleteLink } from "./actions";
import { Button } from "@/components/ui/button";

interface LinkActionsProps {
    link: {
        id: number;
        originalUrl: string;
        shortCode: string;
    };
}

export default function LinkActions({ link }: LinkActionsProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [originalUrl, setOriginalUrl] = useState(link.originalUrl);
    const [shortCode, setShortCode] = useState(link.shortCode);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (isEditOpen || isDeleteOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isEditOpen, isDeleteOpen]);

    useEffect(() => {
        if (isEditOpen) {
            setOriginalUrl(link.originalUrl);
            setShortCode(link.shortCode);
            setError(null);
        }
    }, [isEditOpen, link.originalUrl, link.shortCode]);

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSaving(true);
        setError(null);

        const result = await updateLink({
            linkId: link.id,
            originalUrl,
            shortCode,
        });

        setIsSaving(false);

        if (result.error) {
            setError(result.error);
            return;
        }

        setIsEditOpen(false);
        router.refresh();
    }

    async function handleDelete() {
        setIsDeleting(true);
        setError(null);

        const result = await deleteLink({ linkId: link.id });

        setIsDeleting(false);

        if (result.error) {
            setError(result.error);
            return;
        }

        setIsDeleteOpen(false);
        router.refresh();
    }

    return (
        <>
            <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>
                    <Edit3 className="h-4 w-4" />
                    Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setIsDeleteOpen(true)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                </Button>
            </div>

            {isEditOpen
                ? createPortal(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/70 p-4">
                        <div className="relative w-full max-w-lg rounded-3xl border border-border/80 bg-card p-6 shadow-2xl z-50 max-h-[calc(100vh-4rem)] overflow-auto">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-semibold text-foreground">Edit link</h2>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Update the URL or short code for this saved link.
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() => {
                                        setIsEditOpen(false);
                                        setError(null);
                                    }}
                                >
                                    Close
                                </Button>
                            </div>

                            <form className="mt-6 space-y-4" onSubmit={handleUpdate}>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">Original URL</label>
                                    <input
                                        value={originalUrl}
                                        onChange={(event) => setOriginalUrl(event.target.value)}
                                        className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">Short code</label>
                                    <input
                                        value={shortCode}
                                        onChange={(event) => setShortCode(event.target.value)}
                                        className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                {error ? <p className="text-sm text-destructive">{error}</p> : null}

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => {
                                            setIsEditOpen(false);
                                            setError(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSaving}>
                                        {isSaving ? "Saving…" : "Save changes"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>,
                    document.body
                )
                : null}

            {isDeleteOpen
                ? createPortal(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/70 p-4">
                        <div className="relative w-full max-w-lg rounded-3xl border border-border/80 bg-card p-6 shadow-2xl z-50">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-semibold text-foreground">Delete link</h2>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        This action cannot be undone. Are you sure you want to delete this link?
                                    </p>
                                </div>

                                {error ? <p className="text-sm text-destructive">{error}</p> : null}

                                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => {
                                            setIsDeleteOpen(false);
                                            setError(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="destructive" type="button" disabled={isDeleting} onClick={handleDelete}>
                                        {isDeleting ? "Deleting…" : "Remove link"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
                : null}
        </>
    );
}
