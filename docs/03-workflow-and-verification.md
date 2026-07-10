# Workflow and Verification

Follow this process when implementing or changing features.

## Before editing
- Review the relevant files in app/, components/, db/, and lib/.
- Match the surrounding style rather than inventing a new pattern.
- Keep the scope of the change focused on the task.

## When implementing a feature
1. Understand the user-facing behavior and the relevant data flow.
2. Make the smallest change that solves the problem.
3. Reuse existing components and utilities whenever possible.
4. Keep the implementation easy to read and maintain.

## Verification
- Run npm run lint after changes.
- Run npm run build when the change affects rendering, routes, or data access.
- If a change touches the database layer, confirm the schema and related code remain consistent.

## Documentation updates
- Update the relevant documentation in docs/ if architecture, conventions, or workflows change.
- Keep the instructions accurate and concise so future agents can follow them easily.
