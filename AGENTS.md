# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 15 to-do list app with TypeScript and Tailwind CSS.

### Services

| Service | Command | Port | Notes |
|---|---|---|---|
| Dev server | `npm run dev` | 3000 | Next.js dev server with hot reload |

### Common commands

See `package.json` scripts for all available commands. Key ones:

- **Dev:** `npm run dev` (port 3000)
- **Lint:** `npm run lint`
- **Test:** `npm test`
- **Build:** `npm run build`

### Non-obvious caveats

- The jsdom test environment does not provide `crypto.randomUUID`. It is polyfilled in `jest.setup.ts`.
- `next lint` shows a deprecation warning about moving to the ESLint CLI in Next.js 16; this is informational only and does not affect lint results.
- No external services (databases, caches, etc.) are required. All state is client-side.
