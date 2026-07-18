import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { links } from "@/db/schema";

function generateShortCode(length = 7) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

export async function getLinksByUserId(userId: string) {
    return db
        .select({
            id: links.id,
            originalUrl: links.originalUrl,
            shortCode: links.shortCode,
            createdAt: links.createdAt,
        })
        .from(links)
        .where(eq(links.userId, userId))
        .orderBy(desc(links.createdAt));
}

export async function createLinkForUser(userId: string, originalUrl: string, shortCode?: string) {
    const code = shortCode && shortCode.trim() !== "" ? shortCode.trim() : generateShortCode();

    return db.insert(links).values({
        userId,
        originalUrl,
        shortCode: code,
    }).returning({
        id: links.id,
        originalUrl: links.originalUrl,
        shortCode: links.shortCode,
        createdAt: links.createdAt,
    });
}

export async function updateLinkForUser(
    userId: string,
    linkId: number,
    originalUrl: string,
    shortCode?: string
) {
    return db
        .update(links)
        .set({
            originalUrl,
            shortCode: shortCode?.trim() ?? undefined,
        })
        .where(and(eq(links.id, linkId), eq(links.userId, userId)))
        .returning({
            id: links.id,
            originalUrl: links.originalUrl,
            shortCode: links.shortCode,
            createdAt: links.createdAt,
        });
}

export async function deleteLinkForUser(userId: string, linkId: number) {
    return db
        .delete(links)
        .where(and(eq(links.id, linkId), eq(links.userId, userId)))
        .returning({
            id: links.id,
        });
}
