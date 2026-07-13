# coss-svelte Development Rules

This repository is intended to become a publishable Svelte component library. Keep setup and implementation work cleanly separated.

## Current State

- Foundation scaffold only.
- No component implementation is present yet.
- Upstream source material lives in ignored `.cache/upstream`.
- Component scope and implementation outlines live in `docs/scope`.

## Rules

- Do not copy React/Base UI component source into Svelte files.
- Use Bits UI or native Svelte markup as the implementation foundation.
- Keep docs examples and registry examples aligned; avoid demo-only components in `apps/www`.
- Add component code only under `packages/coss-svelte` after the relevant implementation phase is selected.
- Add generated registry output only under `apps/registry`.
- Keep raw upstream clones and downloaded source snapshots out of git.
- Update `docs/references/version-baseline.md` whenever core dependency versions change.
- Update `docs/scope/component-implementation-outline.md` when a component strategy changes.
- Use Biome for formatting and linting. Do not add ESLint or Prettier unless an ADR explains a gap Biome cannot cover.

## Commit Standards

- Follow the [repository commit standards](docs/commit-standards.md), based on Conventional Commits 1.0.0.
- All contributors, including coding agents, must use Conventional Commit messages when creating commits.
- Agents must read `docs/commit-standards.md` before committing and keep unrelated changes in separate commits.

## Verification Expectations

Before claiming implementation work is complete, run the narrowest relevant checks:

- `pnpm install --frozen-lockfile`
- `pnpm biome:ci`
- `pnpm check`
- component-specific tests once test infrastructure exists
- docs app visual verification once `apps/www` has routes
