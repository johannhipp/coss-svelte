# Contributing

Thanks for helping prepare `coss-svelte` for public use. Keep setup, documentation, and component implementation changes cleanly separated so releases remain easy to review.

## Development

```sh
pnpm install --frozen-lockfile
pnpm biome:ci
pnpm check
pnpm test
```

Before a release-oriented change is considered complete, run:

```sh
pnpm release:check
```

## Scope

- Component source belongs in `packages/coss-svelte`.
- Shared theme CSS belongs in `packages/theme`.
- Registry schema and generated metadata belong in `packages/registry` and `apps/registry`.
- Documentation UI belongs in `apps/www`.
- Implementation plans and decisions belong in `docs/implementation`.
- Raw upstream clones and downloaded source snapshots must stay out of git.

## Component Work

Use `docs/implementation/phases.md` as the ordering guide and keep each pull request scoped to a small component family. Update registry metadata, docs examples, and tests with the component changes.

## Release Work

Follow `docs/release.md`. Do not publish to npm as part of ordinary contribution work, and do not add CI automation that publishes packages without an explicit maintainer decision.
