---
description: Read this file before implementing server actions or data mutations in this project.
---
# Server Actions Guidelines

## Required patterns
- All data mutations must be implemented as server actions.
- Server actions must be called from client components.
- Each server action file must be named actions.ts and placed beside the component that calls it.
- All data passed into server actions must be strongly typed with TypeScript types; do not use the FormData type.
- All server actions must validate input with zod.
- Every server action must verify that a user is logged in before performing any database work.
- Server actions should not throw errors; they should return an object with either an error or success property. If the user is not authenticated, the server action should return an error object, and the caller should await that result.
- Database operations inside server actions must go through helper functions in the /data directory; do not use Drizzle queries directly in the server action.
