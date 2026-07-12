import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
    id: integer("id")
        .primaryKey()
        .generatedByDefaultAsIdentity(),
    userId: text("user_id").notNull(),
    originalUrl: text("original_url").notNull(),
    shortCode: text("short_code").notNull().unique(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date",
    })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date",
    })
        .notNull()
        .defaultNow(),
});
