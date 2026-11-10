# Contributing

Thanks for contributing to `coss-svelte`. Keep setup, documentation, and component implementation changes cleanly separated so releases remain easy to review.

## Development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The root development command performs the initial package build, then watches the package and docs
app together. For verification, run:

```sh
pnpm biome:ci
pnpm check
pnpm test
```

The browser matrix can be narrowed while developing a component family:

```sh
pnpm test:browser:components
node scripts/smoke-docs-browser.mjs --family modal
```

The first command builds the docs app before running every component family.
The second reuses an existing build and accepts any family listed in
`tests/component-family-matrix.mjs`.

Before a release-oriented change is considered complete, run:

```sh
pnpm release:check
```

## Scope

- Component source belongs in `packages/coss-svelte`.
- Shared theme CSS belongs in `packages/theme`.
- Registry schema and generated metadata belong in `packages/registry` and `apps/registry`.
- Documentation UI belongs in `apps/www`.
- Raw upstream clones and downloaded source snapshots must stay out of git.

SvelteKit and Vite are the verified consumer path. Keep public examples on Svelte 5, Tailwind CSS 4, and the declared Bits UI peer range unless a compatibility change is intentional.

## Amp Orbs

`.agents/setup` prepares the snapshot with Node 22.23.3, the `package.json` pnpm version,
locked dependencies, Playwright Chromium and its Debian libraries/fonts, generated package
declarations, and SvelteKit configuration. Exact snapshots reuse this work; setup on a stale
snapshot rechecks dependencies without reinstalling the toolchain or cached browser.
The repository-scoped login-shell hook selects the same toolchain for agents and services.
When updating the Node pin, update both architecture checksums from the official Node release.
Recheck the Debian package list against `pnpm exec playwright install-deps --dry-run chromium`
when upgrading Playwright.

`.agents/resume` only checks readiness; it does not install dependencies or authenticate users.
Run `.agents/setup` manually if a check reports missing prerequisites. No environment files,
secrets, databases, or external accounts are required for local development.

Start the supervised package watcher and docs preview with:

```sh
amp orb services ensure
```

This prints the docs portal URL. Use `amp orb service logs docs` or
`amp orb service logs package-watch` to inspect a service. Generated portal links and review
artifacts are ignored; service configuration is tracked in `.amp/services.yaml`.
These lifecycle files configure future orbs after they reach the project's default branch.

## Component Work

Keep each pull request scoped to a small component family. Update canonical
component metadata, generated registry output, docs examples, API reference
content, and relevant tests together.

## Release Work

Follow `docs/release.md`. Do not publish to npm as part of ordinary contribution work, and do not add CI automation that publishes packages without an explicit maintainer decision.
