"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { createLinkForUser, updateLinkForUser, deleteLinkForUser } from "@/data/links";

const createLinkSchema = z.object({
    originalUrl: z.string().url({ message: "Enter a valid URL." }),
    shortCode: z.string().optional(),
});

const updateLinkSchema = z.object({
    linkId: z.number(),
    originalUrl: z.string().url({ message: "Enter a valid URL." }),
    shortCode: z.string().optional(),
});

const deleteLinkSchema = z.object({
    linkId: z.number(),
});

export async function createLink(data: { originalUrl: string; shortCode?: string }) {
    const parsed = createLinkSchema.safeParse(data);

    if (!parsed.success) {
        return {
            error: parsed.error.flatten().fieldErrors.originalUrl?.join(" ") ?? "Invalid input.",
        };
    }

    const { userId } = await auth();
    if (!userId) {
        return { error: "User is not authenticated." };
    }

    const shortCode = parsed.data.shortCode?.trim() || undefined;
    const link = await createLinkForUser(userId, parsed.data.originalUrl, shortCode);
    return { success: link };
}

export async function updateLink(data: { linkId: number; originalUrl: string; shortCode?: string }) {
    const parsed = updateLinkSchema.safeParse(data);

    if (!parsed.success) {
        return {
            error: parsed.error.flatten().fieldErrors.originalUrl?.join(" ") ?? "Invalid input.",
        };
    }

    const { userId } = await auth();
    if (!userId) {
        return { error: "User is not authenticated." };
    }

    const updated = await updateLinkForUser(
        userId,
        parsed.data.linkId,
        parsed.data.originalUrl,
        parsed.data.shortCode?.trim()
    );

    return { success: updated };
}

export async function deleteLink(data: { linkId: number }) {
    const parsed = deleteLinkSchema.safeParse(data);

    if (!parsed.success) {
        return { error: "Invalid link." };
    }

    const { userId } = await auth();
    if (!userId) {
        return { error: "User is not authenticated." };
    }

    const deleted = await deleteLinkForUser(userId, parsed.data.linkId);
    return { success: deleted };
}
