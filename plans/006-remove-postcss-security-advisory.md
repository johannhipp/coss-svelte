# Plan 006: Remove the high-severity PostCSS advisory

> **Executor instructions**: This is an independent security lane. Make the
> smallest durable dependency-resolution change and keep it in an isolated
> conventional commit if commits are requested. Update `plans/README.md`
> whenever this plan’s status changes.
>
> **Drift check (run first)**:
> `git diff --stat aced7142d97c241fb8cf62d613b72f819f883476..HEAD -- package.json pnpm-workspace.yaml pnpm-lock.yaml apps/www/package.json packages/coss-svelte/package.json docs/references/version-baseline.md`

## Status

- **Status**: DONE
- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: security, dependencies
- **Planned at**: commit
  `aced7142d97c241fb8cf62d613b72f819f883476`, 2026-07-28

## Goal

Resolve every installed PostCSS instance to a patched 8.5.x version without an
unrelated Vite/SvelteKit upgrade, prove the advisory is absent, and preserve a
frozen reproducible lockfile.

## Fresh evidence captured 2026-07-28

- `pnpm why postcss --recursive` reports one installed version:
  `postcss@8.5.15`, under `vite@8.0.16`.
- `pnpm audit --audit-level high --json` reports
  [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849):
  “Path Traversal in Previous Source Map Auto-Loading,” vulnerable
  `<=8.5.17`, patched `>=8.5.18`.
- The current npm PostCSS release is 8.5.23.
- Vite 8.0.16 already declares `postcss: ^8.5.15`, so 8.5.23 is compatible.
- Vite 8.1.5 declares `postcss: ^8.5.17`, but a Vite upgrade is not required to
  resolve this advisory.
- In a disposable copy of the current manifests and lockfile, pinned pnpm
  11.5.2 exited successfully for a depth-infinite update targeted directly at
  `postcss@8.5.23` but left `8.5.15` unchanged because PostCSS is not a direct
  workspace dependency. Targeting Vite refreshed the wider Vite subtree,
  including Lightning CSS, Nano ID, and optional binaries, which violates this
  plan's narrow-diff requirement.

Re-run the registry/audit observations at execution time because advisory and
registry state can change. Re-test update behavior only if the pinned pnpm
version changes.

## Scope

**In scope**

- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `docs/references/version-baseline.md`

**Out of scope**

- Vite/SvelteKit/Tailwind upgrades
- Other outdated packages or lower-severity advisory cleanup
- `pnpm audit --fix --force`
- Suppression, ignore rules, or a vulnerable-version exception

## Remediation decision

Add one root workspace override pinned to `8.5.23` (or the current verified
patched 8.5.x at execution) and regenerate only the lockfile. This is the
smallest reproducible operation supported by pinned pnpm 11.5.2: targeting the
transitive package is a no-op, while refreshing Vite's dependency subtree
causes unrelated churn.

Do not also change Vite or another direct toolchain dependency. Do not use a
range that still admits 8.5.17, and do not place the override in
`package.json`.

## Implementation

### Step 1: Capture a machine-readable baseline

Run:

```sh
pnpm why postcss --recursive
pnpm audit --audit-level high --json
pnpm view postcss version --json
pnpm view vite@8.0.16 dependencies.postcss --json
```

Save the relevant versions/advisory ID in the implementation handoff. Confirm
that no other high-severity advisory is being conflated with this change.

### Step 2: Pin the transitive security floor

Add this root workspace setting, merging with any settings added since
planning:

```yaml
# pnpm-workspace.yaml
overrides:
  postcss: 8.5.23
```

If registry freshness changed, substitute only a verified patched 8.5.x. Then
run:

```sh
pnpm install --lockfile-only
git diff -- pnpm-lock.yaml pnpm-workspace.yaml
pnpm why postcss --recursive
```

Expected:

- the workspace settings gain exactly one override;
- only the PostCSS snapshot/resolution, integrity data, and override snapshot
  change in the lockfile;
- every installed/resolved PostCSS is `>=8.5.18`;
- no direct dependency version changes;
- no unrelated lockfile churn.

[pnpm 11 reads project settings](https://pnpm.io/11.x/settings#overrides),
including `overrides`, from the root `pnpm-workspace.yaml`; do not place
`pnpm.overrides` in `package.json` or duplicate it in child manifests.

### Step 3: Update the dependency baseline

Add PostCSS to `docs/references/version-baseline.md` with:

- the selected version;
- role “CSS parser used by Vite/Tailwind”;
- a note that the workspace override is a transitive security floor.

Update the capture/update date without implying unrelated listed versions were
refreshed. State in the handoff that no package manifest or direct dependency
changed.

### Step 4: Prove resolution and reproducibility

Run in order:

```sh
pnpm install --frozen-lockfile
pnpm why postcss --recursive
pnpm audit --audit-level high
pnpm --filter @coss-svelte/www build
pnpm --filter coss-svelte test
pnpm release:check
```

Expected:

- frozen install exits 0;
- no resolved PostCSS is below 8.5.18;
- GHSA-r28c-9q8g-f849 is absent;
- `pnpm audit --audit-level high` exits 0 given the captured baseline;
- docs CSS builds and package tests pass;
- the full release gate passes.

Review the final diff once more. The planning experiment above is the reason
the override is used; do not substitute a broad Vite-subtree refresh merely to
avoid one documented workspace setting.

## Acceptance criteria

- [ ] Every PostCSS resolution is at least 8.5.18.
- [ ] GHSA-r28c-9q8g-f849 is absent from JSON and human audit output.
- [ ] No unrelated direct dependency was upgraded.
- [ ] One root workspace override records the exact patched security floor.
- [ ] `pnpm install --frozen-lockfile` reproduces the graph.
- [ ] The version baseline records the selected PostCSS version/security floor.
- [ ] Docs build, package tests, and `pnpm release:check` pass.

## STOP conditions

- Stop if remediation would require a Vite/SvelteKit major or unrelated direct
  dependency upgrade.
- Stop if the targeted command causes broad lockfile churn that cannot be
  explained by PostCSS.
- Stop if patched PostCSS breaks Vite, Tailwind, or package tests.
- Stop if a new unrelated high advisory appears; report it separately instead
  of widening this commit without review.
- Stop if the dependency files contain overlapping user edits that cannot be
  preserved.

## Maintenance notes

Remove the root override in a later dependency refresh only after a clean
lockfile resolution selects a patched PostCSS without it and the audit remains
green. Never leave an override unexplained in the version baseline.
