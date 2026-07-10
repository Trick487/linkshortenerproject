# Agent Instructions for This Project

This repository is a Next.js application using TypeScript, Tailwind CSS, Clerk authentication, and Drizzle ORM. Follow the project-specific guidance in the documentation files in the docs/ directory instead of relying on generic defaults.

## Primary rules
- Keep changes aligned with the existing App Router structure and current UI patterns.
- Prefer server components by default and use client components only when interactivity requires them.
- Reuse the existing UI primitives in components/ui before creating new patterns.
- All UI elements must use shadcn UI components; do not create custom components.
- Keep database and auth changes consistent with the current Drizzle and Clerk setup.
- Verify changes with npm run lint and, when relevant, npm run build.

## Reference documents

This is extremely important: before generating any code, you MUST read the relevant individual instruction files in the `/docs` directory and follow them carefully. Do not skip this step. If a task involves project structure, coding standards, workflow, or authentication, read the matching documentation file(s) first.

Required files to review before coding:
- [docs/01-project-overview.md](docs/01-project-overview.md)
- [docs/02-coding-standards.md](docs/02-coding-standards.md)
- [docs/03-workflow-and-verification.md](docs/03-workflow-and-verification.md)
- [docs/04-authentication.md](docs/04-authentication.md)

## Additional note
- If a behavior or API is unclear, inspect the local Next.js documentation in node_modules/next/dist/docs/ before implementing a workaround.
