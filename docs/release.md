# Release Process

Releases are manual and publish two synchronized packages from one verified commit.

## Prepare the release commit

1. Set `packages/coss-svelte` and `packages/theme` to the same version.
2. Update `CHANGELOG.md`, public READMEs, package availability wording, component status notes, and generated API metadata together.
3. Run `pnpm install --frozen-lockfile`.
4. Run `pnpm release:check`.
5. Open a release pull request in the public repository. List every change, include the verification results, and review the Vercel branch preview.
6. Merge the reviewed pull request after its checks pass, then verify the resulting `main` commit before tagging or publishing.

The hosted docs use the Vercel project connected to this repository. Git pushes to branches generate preview deployments; pushes to `main` generate production deployments. Vercel runs `pnpm vercel:build`; do not create a separate manual deployment.

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
  --theme-tarball .artifacts/release/coss-svelte-theme-0.2.0.tgz \
  --component-tarball .artifacts/release/coss-svelte-0.2.0.tgz
```

## Publish boundary

Do not publish from ordinary CI. After both artifacts from the verified `main` commit pass inspection and the clean consumer check, tag that exact commit (for example, `v0.2.0`). With maintainer authorization, publish the inspected theme artifact first:

```sh
npm publish .artifacts/release/coss-svelte-theme-0.2.0.tgz --access public
npm publish .artifacts/release/coss-svelte-0.2.0.tgz --access public
```

Verify both npm package pages, then install the published versions into the same clean SvelteKit consumer:

```sh
node scripts/check-clean-consumer.mjs --registry
```

Do not rebuild different tarballs during publication. Create the GitHub Release from the verified tag and its changelog only after publication succeeds. Record the exact commit, package versions, artifact checksums, and publication verification results in `docs/release-readiness-plan.md`. Keep unreleased versions clearly marked until these steps are complete.
