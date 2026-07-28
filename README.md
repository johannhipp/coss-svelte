# coss-svelte

`coss-svelte` is a Svelte 5, copy-and-own component library inspired by COSS UI's clean product interface language.

The repository contains the component package, documentation app, registry output, shared theme CSS, implementation notes, and verification scripts needed to prepare a future public GitHub and npm release.

The npm package is not published yet. Use this repository as the source of truth until a public release is cut.

## Stack

- Svelte 5.56.3
- SvelteKit 2.64.0
- Vite 8.0.16
- Bits UI 2.18.1
- Tailwind CSS 4.3.0
- pnpm 11.5.2

Versions were captured from npm on 2026-06-10.

## Packages and Apps

- `apps/www` - SvelteKit documentation site, mirroring the COSS `apps/www` role for coss-svelte.
- `apps/registry` - generated registry assets and component metadata.
- `packages/coss-svelte` - publishable Svelte component source package.
- `packages/cli` - future install/update CLI, modeled after shadcn-svelte's registry workflow.
- `packages/registry` - registry schema/types/utilities.
- `packages/theme` - design tokens, Tailwind preset, and CSS variable contracts.
- `docs/scope` - component inventory and implementation outline.
- `docs/references` - local summaries of upstream projects and cached reference locations.
- `scripts` - setup and documentation-maintenance scripts.

## Local Development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The root development command first builds the package declarations and JavaScript, then watches both
`packages/coss-svelte` and the SvelteKit docs app. Package source edits therefore reach docs routes
without a separate build command. Use `pnpm check` and `pnpm test` for focused verification.

Run the full pre-release verification before tagging or publishing:

```sh
pnpm release:check
```

`pnpm release:check` validates formatting, Svelte and TypeScript diagnostics, tests, and npm pack contents. It does not publish to npm.

## Commit Standards

This repository uses [Conventional Commits 1.0.0](docs/commit-standards.md). Human contributors and
coding agents must read and follow the commit guide before creating commits, including the required
type prefix and breaking-change notation. Use the repository commit template at `.gitmessage.txt`:

```sh
git config commit.template .gitmessage.txt
```

The template is a starting point; remove unused sections and keep unrelated changes in separate
commits.

## Release Boundary

Publishing is intentionally manual. Follow `docs/release.md` when preparing a public GitHub release or future npm release.

Do not publish to npm from CI or during private-repository setup.
