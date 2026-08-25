# Contributing

Thanks for helping prepare `coss-svelte` for public use. Keep setup, documentation, and component implementation changes cleanly separated so releases remain easy to review.

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

## Component Work

Keep each pull request scoped to a small component family. Update canonical
component metadata, generated registry output, docs examples, API reference
content, and relevant tests together.

## Release Work

Follow `docs/release.md`. Do not publish to npm as part of ordinary contribution work, and do not add CI automation that publishes packages without an explicit maintainer decision.
