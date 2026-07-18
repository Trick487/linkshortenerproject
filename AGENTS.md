# Agent Instructions for This Project


## Primary rules
- Keep changes aligned with the existing App Router structure and current UI patterns.
- Prefer server components by default and use client components only when interactivity requires them.
- Reuse the existing UI primitives in components/ui before creating new patterns.
- All UI elements must use shadcn UI components; do not create custom components.
- Keep database and auth changes consistent with the current Drizzle and Clerk setup.
- Verify changes with npm run lint and, when relevant, npm run build.


## Additional note
- If a behavior or API is unclear, inspect the local Next.js documentation in node_modules/next/dist/docs/ before implementing a workaround.
