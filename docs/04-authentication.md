# Authentication Standards

Authentication in this project is handled exclusively by Clerk. Do not introduce any other auth method, provider, or custom session system.

## Required behavior
- The /dashboard page is a protected route and must only be accessible to signed-in users.
- If a signed-in user visits the homepage, redirect them to /dashboard.
- Sign in and sign up flows must use Clerk and must open as a modal rather than a full-page redirect.
- Keep auth UI consistent with the existing Clerk setup in the app layout.

## Implementation guidance
- Prefer Clerk components and helpers from @clerk/nextjs.
- Use Clerk-based protection for routes instead of building custom auth checks.
- Keep secrets and environment values out of source code.
