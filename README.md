# coss-svelte

`coss-svelte` is planned as a SvelteKit-native, copy-and-own component library inspired by COSS UI's clean product interface language.

This repository is currently a foundation scaffold only. It contains the planned monorepo shape, upstream reference cache workflow, component scope documentation, and implementation outlines. It intentionally does not contain component implementations yet.

## Intended Stack

- Svelte 5.56.3
- SvelteKit 2.64.0
- Vite 8.0.16
- Bits UI 2.18.1
- Tailwind CSS 4.3.0
- pnpm 11.5.2

Versions were captured from npm on 2026-06-10.

## Monorepo Shape

- `apps/www` - SvelteKit documentation site, mirroring the COSS `apps/www` role for coss-svelte.
- `apps/registry` - generated registry assets and examples once implementation starts.
- `packages/coss-svelte` - publishable Svelte component source package.
- `packages/cli` - future install/update CLI, modeled after shadcn-svelte's registry workflow.
- `packages/registry` - registry schema/types/utilities.
- `packages/theme` - design tokens, Tailwind preset, and CSS variable contracts.
- `docs/scope` - component inventory and implementation outline.
- `docs/references` - local summaries of upstream projects and cached reference locations.
- `scripts` - setup and documentation-maintenance scripts.

## Current Boundary

No component code has been implemented. The next development phase should start from `docs/scope/component-implementation-outline.md` and implement components in dependency order, beginning with tokens, utilities, and low-risk presentational primitives.
