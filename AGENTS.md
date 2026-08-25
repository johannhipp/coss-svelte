# coss-svelte Development Rules

This repository is a publishable Svelte component library. Keep package
implementation, generated registry output, and docs-only code cleanly separated.

## Current State

- The stable and experimental component surface is implemented under
  `packages/coss-svelte` and checked through generated declarations.
- The docs app and registry are local, executable consumers of that package.
- Upstream source material lives in ignored `.cache/upstream`.
- Component status and composition live in `packages/coss-svelte/src/metadata.js`.
- Release status and remaining work live in `docs/release-readiness-plan.md`.

## Rules

- Do not copy React/Base UI component source into Svelte files.
- Use Bits UI or native Svelte markup as the implementation foundation.
- Keep docs examples and registry examples aligned; avoid demo-only components in `apps/www`.
- Add component code only under `packages/coss-svelte` after the relevant
  implementation phase is selected and metadata/registry/docs contracts are
  updated together.
- Add generated registry output only under `apps/registry`.
- Keep raw upstream clones and downloaded source snapshots out of git.
- Update package metadata when a component strategy changes.
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
- component-specific tests
- docs app visual verification for UI changes
- `pnpm release:check` for publish-facing changes
