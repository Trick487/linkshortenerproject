# Project Overview

This repository is a Next.js application built with the App Router, TypeScript, Tailwind CSS, Clerk authentication, and Drizzle ORM. The project is intentionally lightweight and should stay easy to understand.

## Tech stack
- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS
- Clerk for authentication
- Drizzle ORM with PostgreSQL
- shadcn-style UI primitives in the components/ui folder

## Repository structure
- app/: route-level pages and layouts
- components/: reusable UI and feature components
- components/ui/: shared primitive components such as buttons
- db/: database schema and related persistence code
- lib/: shared helpers and utilities

## Project conventions
- Prefer server components by default.
- Use client components only when interactivity, hooks, or browser APIs are required.
- Keep components small and focused on one responsibility.
- Reuse existing UI primitives before introducing new styling patterns.
- Use the @/ alias for internal imports.
- Keep the codebase visually consistent with the current Tailwind-based styling.
