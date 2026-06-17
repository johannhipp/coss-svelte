# Release Process

Use this checklist when preparing a public GitHub or npm release.

## Before a Public GitHub Release

1. Confirm the repository has no private caches, local credentials, generated screenshots, or upstream source snapshots checked in.
2. Run `pnpm install --frozen-lockfile`.
3. Run `pnpm release:check`.
4. Review `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `CHANGELOG.md` for the release state.
5. Create a release commit that updates package versions and `CHANGELOG.md`.

## Before an npm Release

1. Make sure the public GitHub repository and npm package metadata point at the same release commit.
2. Run `pnpm release:check`.
3. Inspect the package contents with `pnpm pack:dry-run` or from the package directory with `npm pack --dry-run`.
4. Confirm the tarball contains only `src`, `README.md`, `LICENSE`, and `package.json`.
5. Confirm `bits-ui` and `svelte` remain peer dependencies, not bundled dependencies.

## Publish Boundary

Do not publish from CI. Keep package publishing as a manual maintainer action until the project has a stable release policy.

When the release is intentionally approved, publish from `packages/coss-svelte`:

```sh
npm publish --access public
```

Do not run the publish command during private-repository preparation.
