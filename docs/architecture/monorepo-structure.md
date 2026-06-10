# Monorepo Structure

The structure intentionally borrows from `cosscom/coss`, but adapts it to a Svelte-first package and documentation workflow.

## Source Reference

COSS currently splits UI docs/registry work and marketing demos across:

- `apps/ui` - Next.js UI docs, component pages, registry output, particles, component previews, `llms.txt`.
- `apps/www` - Next.js marketing/demo pages.
- `apps/ui/registry/default` - source registry components, hooks, utilities, particles.
- `apps/ui/public/r` - generated registry JSON.

## coss-svelte Target Shape

- `apps/www` - SvelteKit + Vite docs site. This will be the public documentation and preview app for coss-svelte.
- `apps/registry` - generated registry JSON and static install artifacts.
- `packages/coss-svelte` - publishable Svelte component package.
- `packages/theme` - Tailwind v4/CSS variable/token layer.
- `packages/registry` - registry schema, metadata, and dependency graph utilities.
- `packages/cli` - future CLI for installing/updating copy-and-own components.
- `docs/scope` - component inventory and implementation outlines.
- `docs/references` - local upstream reference map, version baseline, and architecture notes.
- `scripts` - refresh and documentation-generation scripts.

## Deliberate Differences From COSS

- Use SvelteKit for `apps/www`, not Next.js.
- Use Bits UI for headless behavior, not Base UI.
- Keep docs and registry generation separate so the package can be published without site-only code.
- Keep raw upstream snapshots ignored in `.cache/upstream`.
- Start with a package-first library surface before adding a CLI.

## Apps/www Design Direction

The documentation app should resemble the COSS UI docs experience:

- left navigation grouped by component category
- clean header and command/search entry
- component page title, description, install command, import block, preview, anatomy, API notes, particles
- neutral, dense product UI styling rather than marketing-heavy sections
- all examples authored in Svelte and sourced from the registry/examples system

Do not build the docs UI until the first implementation batch exists.
