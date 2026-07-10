# Coding Standards

These rules apply to all changes in this project.

## TypeScript and React
- Write clear, typed TypeScript and avoid any unnecessary use of any.
- Prefer explicit props and return types when they improve readability.
- Keep components functional and straightforward.
- Use the React and Next.js patterns already present in the project rather than introducing custom abstractions.

## App Router and component boundaries
- Put route-specific UI in app/.
- Keep reusable UI in components/ or components/ui/.
- Use server components for data fetching and rendering by default.
- Mark files as client components only when needed with "use client".

## Styling
- Use Tailwind utility classes for layout, spacing, and visual design.
- All UI elements must use shadcn UI components.
- Do not create custom components for interface elements; always use the existing shadcn-based primitives.
- Prefer the existing button and utility patterns in components/ui and lib/utils.ts.
- Use the cn helper when combining conditional class names.
- Avoid introducing new styling systems or large inline style objects.

## Accessibility
- Use semantic HTML elements where appropriate.
- Ensure buttons, links, and forms are keyboard accessible.
- Keep labels and alt text meaningful.

## Data and auth
- Keep database schema definitions in db/schema.ts.
- Use Drizzle ORM patterns consistently for database access.
- Keep Clerk usage aligned with the existing provider setup in app/layout.tsx.
- Do not hardcode secrets or environment values in source code.

## Code quality
- Favor small, reviewable edits over large refactors.
- Preserve existing behavior unless the task explicitly requires a change.
- Keep naming consistent and descriptive.
- Remove dead code and unused imports.
