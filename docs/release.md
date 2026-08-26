# Release Process

Releases are manual and publish two synchronized packages from one verified commit.

## Prepare the release commit

1. Set `packages/coss-svelte` and `packages/theme` to the same version.
2. Update `CHANGELOG.md`, public READMEs, package availability wording, component status notes, and generated API metadata together.
3. Run `pnpm install --frozen-lockfile`.
4. Run `pnpm release:check`.
5. Open and merge a release pull request while the repository is still private.

The hosted docs use the Vercel project connected to this repository. Vercel runs `pnpm vercel:build` for pushes to `main`; do not create a separate manual deployment.

## Verify the exact artifacts

From a fresh checkout of the verified `main` commit:

```sh
pnpm install --frozen-lockfile
pnpm release:check
pnpm pack:dry-run
```

Create both tarballs without rebuilding between verification and publication:

```sh
mkdir -p .artifacts/release
pnpm --dir packages/theme exec npm pack --ignore-scripts --pack-destination ../../.artifacts/release
pnpm --dir packages/coss-svelte exec npm pack --ignore-scripts --pack-destination ../../.artifacts/release
```

Inspect the names, versions, exports, peer dependencies, README, license, and file list for both artifacts. Verify the exact files in a clean SvelteKit consumer:

```sh
node scripts/check-clean-consumer.mjs \
  --theme-tarball .artifacts/release/coss-svelte-theme-0.1.0.tgz \
  --component-tarball .artifacts/release/coss-svelte-0.1.0.tgz
```

## Publish boundary

Do not publish from ordinary CI. After the repository is public and the verified commit is tagged, publish the inspected theme artifact first:

```sh
npm publish .artifacts/release/coss-svelte-theme-0.1.0.tgz --access public
npm publish .artifacts/release/coss-svelte-0.1.0.tgz --access public
```

Verify both npm package pages, then install the published versions into the same clean SvelteKit consumer:

```sh
node scripts/check-clean-consumer.mjs --registry
```

Do not rebuild different tarballs during publication. The GitHub Release is the public launch record; no separate announcement is required for `0.1.0`.
