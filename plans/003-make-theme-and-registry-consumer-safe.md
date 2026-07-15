# Plan 003: Make the theme and registry consumer-safe

> **Executor instructions**: Follow this plan step by step and run every
> verification gate. Preserve the current docs appearance while separating
> consumer and app concerns. If a STOP condition occurs, stop and report; do
> not paper over missing registry files with path aliases or undocumented
> consumer setup. Update this plan's row in `plans/README.md` when complete.
>
> **Drift check (run first)**:
> `git diff --stat 5d8ebb6..HEAD -- packages/theme packages/registry scripts/build-registry.mjs apps/registry apps/www/src/routes/+layout.svelte apps/www/src/lib/docs/markdown.js apps/www/src/routes/docs/getting-started tests package.json pnpm-lock.yaml docs/references/version-baseline.md`
> Plans 001 and 002 must be complete. Material drift or missing generated
> package output is a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: HIGH
- **Depends on**: `plans/001-consolidate-component-catalog.md`,
  `plans/002-make-package-contracts-real.md`
- **Category**: migration
- **Planned at**: commit `5d8ebb6`, 2026-07-15

## Why this matters

The project advertises a copy-and-own registry and a required theme, but neither
surface is consumable as generated. Every registry item omits at least one
direct local dependency, the files contain no source content, and the deferred
NumberField item contains no files at all. The private theme also depends on
repository-relative scan paths and contains docs-only/global rules. This plan
defines a clean consumer CSS boundary and makes every installable registry item
prove its complete file, package, and style closure in a fresh app.

## Current state

- `packages/theme/package.json:2-8` names `@coss-svelte/theme` but marks it
  `private: true`; docs nevertheless tell consumers to import
  `@coss-svelte/theme/style-coss.css`.
- `packages/theme/src/style-coss.css` is 4,260 lines:
  - lines 1–3 import Tailwind and scan `apps/www` plus package source through
    repository-relative `@source` paths;
  - lines 49–175 define light/dark tokens;
  - lines 177–202 style every element's box sizing and scrollbars;
  - lines 204–359 contain docs intro/code styles;
  - lines 262–273 set global `body` and form-control rules;
  - lines 3194–3355 contain docs search styles;
  - the rest is component `cn-*` styling.
- There are 24 unique `docs-*` selectors mixed into the theme. Biome reports
  two descending-specificity warnings at lines 3123 and 3125.
- `packages/registry/src/index.js:10-17` hardcodes six theme variables with
  values that are independent from the actual theme token definitions.
- `packages/registry/src/index.js:27-47` emits only root/part path references.
  It does not recursively include imported files or their content.
- A direct closure analysis of all 54 current items found:
  - all 53 non-deferred items omit `packages/coss-svelte/src/utils.js`;
  - many omit `internal/Block.svelte`;
  - Button omits `Spinner.svelte`;
  - DatePicker imports `bits-ui` but its generated dependency list is empty;
  - NumberField has an empty files array.
- Generated files such as `apps/registry/static/r/button.json` contain only
  `path`, `target`, and `type`; they cannot install source into another project.
- `apps/registry/static/r/index.json` points at
  `https://coss-svelte.dev/schema/registry-index.json`, but no matching schema
  is served by this repository.
- `apps/www/src/routes/particles/+page.js:11` copies upstream COSS registry URLs
  rather than local registry URLs.
- Existing registry tests validate array shape and deterministic generation,
  not dependency closure, file content, schema validity, or a consumer build.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Theme check | `pnpm theme:check` | consumer CSS has no repo/docs/global leakage |
| Registry build | `pnpm registry:build` | deterministic local index/items/schemas |
| Registry check | `pnpm registry:check` | checked-in output is current and schema-valid |
| Consumer smoke | `pnpm test:registry-consumer` | fresh generated app builds |
| Docs build | `pnpm --filter @coss-svelte/www build` | exit 0; no CSS warnings |
| Full gate | `pnpm release:check` | exit 0 |

## Scope

**In scope**:

- `packages/theme/package.json`
- `packages/theme/README.md`
- `packages/theme/src/style-coss.css`
- `packages/theme/src/tokens.css` (create)
- `packages/theme/src/components.css` (create)
- `packages/theme/src/tailwind.css` (create only if an optional Tailwind mapping
  remains necessary)
- a canonical theme-token data file and generator under `packages/theme` or
  `scripts` if required to share values with registry metadata
- `apps/www/src/app.css` (create)
- `apps/www/src/routes/+layout.svelte`
- docs-specific component styles currently inside the theme
- `packages/registry/src/index.js`
- `scripts/build-registry.mjs`
- `scripts/check-registry-closure.mjs` (create or fold into build `--check`)
- `apps/registry/static/r/**` (generated)
- `apps/registry/static/schema/**` (create, generated or checked source)
- `apps/registry/package.json`
- root `package.json`
- `pnpm-lock.yaml`
- getting-started/Markdown installation docs
- `docs/references/version-baseline.md`
- registry/theme tests and clean-consumer fixture

**Out of scope**:

- A registry CLI or update/diff workflow.
- Converting upstream COSS React particles into Svelte.
- Changing component markup or `cn-*` class names.
- Implementing NumberField.
- Choosing a production host for the docs/registry domains. Use relative/local
  URLs and configurable base URLs until that separate deployment decision is
  made.
- Visual redesign of the docs app.

## Git workflow

- Branch: `johann/003-consumer-registry`
- Configure `.gitmessage.txt` before committing.
- Suggested Conventional Commits:
  - `refactor(theme): separate consumer and docs styles`
  - `feat(registry): emit complete component file closure`
  - `test(registry): build a clean generated consumer`
- Keep the theme split and registry closure in separate commits so each can be
  reviewed and reverted independently.
- Do not push or open a pull request unless asked.

## Steps

### Step 1: Capture a theme baseline before splitting CSS

Create a deterministic theme contract test before moving rules. At minimum,
record:

- every light and dark semantic `--cn-*` variable and its computed value;
- the set of 361 `cn-*` selectors currently validated by
  `scripts/validate-cn-classes.mjs`;
- representative computed styles for Button, Input, DialogPopup, SelectPopup,
  FieldError, Table, Sidebar, and Toast in light/dark mode.

Use a browser fixture or the existing docs build; do not compare raw variable
text when variables reference other variables. Store expected semantic values
or snapshots in tests, not screenshots under tracked source.

**Verify**:
`pnpm test -- --test-name-pattern='theme consumer contract'` → pass against the
unsplit baseline.

### Step 2: Separate pure consumer CSS from docs and global CSS

Make `@coss-svelte/theme/style-coss.css` a consumer-safe entry that imports only
theme tokens and component styles:

```css
@import "./tokens.css";
@import "./components.css";
```

The consumer entry must not contain:

- repository-relative `@source` paths;
- `.docs-*` selectors;
- `body`, universal `*`, or global native-control reset rules;
- assumptions about the docs font or page background.

Move docs helpers, resets, Tailwind scan directives, semantic utility mappings,
and page-level defaults into `apps/www/src/app.css`, imported once from the root
layout. If Tailwind consumers need semantic utility mappings, expose a separate
documented `@coss-svelte/theme/tailwind.css` entry with no repository paths;
keep the default theme usable as plain CSS.

Resolve Tailwind palette references in consumer tokens from one canonical
source. If token data is moved to JSON/JS so registry `cssVars` can reuse it,
generate `tokens.css` deterministically and add `--check` mode. Do not maintain
light/dark values in CSS and registry JavaScript independently.

Fix the two descending-specificity warnings while preserving computed styles.

**Verify**:

```sh
! rg -n '@source|\.docs-|^(body|\*)\s*\{' packages/theme/src/style-coss.css packages/theme/src/tokens.css packages/theme/src/components.css
```

→ exit 0.

**Verify**:
`pnpm theme:check && pnpm biome:ci && pnpm --filter @coss-svelte/www build`
→ exit 0, no CSS specificity warnings, and baseline theme contract tests pass.

### Step 3: Make the theme package match the documented product boundary

The least disruptive current direction is to keep the existing second package
and make it real. Change `@coss-svelte/theme` from a private placeholder to a
publishable package with license, repository, files, exports, and
`publishConfig` metadata parallel to `coss-svelte`. Export the default consumer
CSS and optional Tailwind integration explicitly.

Update installation docs and generated Markdown so the install command includes
every required package. If the default CSS is plain, do not require Tailwind;
if the optional Tailwind entry is shown, state that Tailwind is required for
that entry only.

Add an npm dry-run for the theme to the release gate and verify it contains no
docs app source.

**Verify**:
`pnpm --filter @coss-svelte/theme exec npm pack --dry-run` → exit 0 and tarball
contents include only the package manifest, README/license, and consumer theme
files.

### Step 4: Build registry files from recursive source closure

Refactor registry generation into two layers:

1. `packages/registry/src/index.js` defines item identity from canonical
   component metadata (name, slug, status, seed root/parts, categories).
2. `scripts/build-registry.mjs` resolves each non-deferred item's full static
   import graph and writes install artifacts.

For each source file, resolve relative imports recursively. Preserve targets so
the existing import specifiers remain valid:

- `src/components/X.svelte` → `components/X.svelte`;
- `src/utils.js` → `utils.js`;
- `src/internal/Block.svelte` → `internal/Block.svelte`.

Each generated file record must contain normalized `path`, `target`, `type`, and
the exact UTF-8 `content`. Detect cycles with a visited set. Fail on unresolved
relative imports, target collisions with different content, files outside the
allowed package/theme roots, or dynamic imports that cannot be analyzed.

Collect external package imports from the resolved closure. Exclude platform
built-ins and the host Svelte runtime only by an explicit documented rule;
declare `bits-ui`, `clsx`, `tailwind-merge`, and any other imported package
exactly when used. Delete the manual `bitsBackedCompoundComponents` set.

**Verify**:
`pnpm registry:build && pnpm registry:check` → exit 0.

**Verify**:
`node scripts/check-registry-closure.mjs` → reports 0 unresolved local imports,
0 undeclared external imports, and 0 target collisions for every installable
item.

### Step 5: Make styles and deferred status explicit in the registry

Create one registry theme/style item containing the consumer-safe theme files.
All component items should depend on it through `registryDependencies`, rather
than embedding 4,000 lines of CSS into every item. Generate any `cssVars` from
the canonical token data; remove the six-value handwritten map.

Exclude deferred roots from the installable registry index and do not emit an
empty `number-field.json`. Deferred status remains visible through package
metadata/docs. Experimental Drawer, Sidebar, and Toast may remain in the index
only when their item metadata says `experimental` and the docs expose their
limitations.

Use configurable/local docs and registry paths. Do not point generated local
items at upstream `coss.com` install URLs.

**Verify**:
`test ! -e apps/registry/static/r/number-field.json` → exit 0.

**Verify**:
`node -e 'const x=require("./apps/registry/static/r/index.json"); if (x.items.some(i=>i.name==="NumberField")) process.exit(1)'`
→ exit 0 (adjust property access to the actual schema without weakening the
predicate).

### Step 6: Serve and validate real local schemas

Add JSON Schemas for the registry index and item shape under
`apps/registry/static/schema`. Every generated `$schema` value must resolve to a
file produced by this repository or be a relative path that a configured host
can serve. Validate all generated JSON during `registry:check` with one schema
validator; record any new dependency version in the baseline.

Schema rules must require file `content` for installable items, unique targets,
known status values, and arrays for external/registry dependencies. The schema
must reject an empty installable file list.

**Verify**:
`pnpm registry:check` → validates index plus every item against local schemas
and reports deterministic output.

### Step 7: Build a clean registry consumer

Create a test harness that starts from an empty temporary Svelte app under an
ignored `.cache` path, reads generated item JSON, follows
`registryDependencies`, writes every target/content pair, installs or links
only declared external dependencies, imports the theme, and builds.

The representative set must include:

- Button (transitive Spinner plus `utils.js`);
- Alert or Card (`internal/Block.svelte` plus `utils.js`);
- Accordion (Bits UI direct wrapper);
- DatePicker (the previously undeclared Bits UI dependency);
- one overlay compound;
- one experimental item, verified as explicitly experimental.

Also run a fast closure-only check across every installable item. The full Vite
build may use the representative set to keep CI time bounded.

Expose `pnpm test:registry-consumer` and run it in root tests.

**Verify**:
`pnpm test:registry-consumer` → temporary consumer installs/links and builds
without source-workspace aliases or undeclared imports.

### Step 8: Run the complete release path

Regenerate registry output, ensure the worktree stays clean on a second build,
and run package/theme/docs verification.

**Verify**:
`pnpm registry:build && git diff --exit-code -- apps/registry/static` → exit 0
after generated output is staged or already current.

**Verify**:
`pnpm install --frozen-lockfile && pnpm release:check && pnpm --filter @coss-svelte/www build`
→ exit 0 and no theme/registry warnings.

## Test plan

- Theme contract tests compare computed light/dark tokens and representative
  component styles before/after the split.
- Theme policy test rejects repo-relative scan paths, docs selectors, and global
  page/reset selectors in the consumer entry.
- Registry schema tests validate every generated JSON file.
- Closure tests recursively verify all local imports and external dependencies.
- Clean-consumer smoke test writes files from JSON content and builds without
  access to package source aliases.
- Determinism check runs generators twice and requires no second diff.

## Done criteria

- [ ] The default theme entry contains only consumer tokens/component styles.
- [ ] Docs/global/Tailwind scan rules live in the docs app or an explicit
      optional integration entry.
- [ ] `@coss-svelte/theme` is either genuinely publishable as planned or the
      work stops for a reviewed package-boundary decision.
- [ ] All generated installable files contain source content.
- [ ] Every registry item has complete local and external dependency closure.
- [ ] Theme data is not duplicated in registry JavaScript.
- [ ] Deferred NumberField has no installable item.
- [ ] Local schemas exist and validate every generated artifact.
- [ ] Representative clean-consumer build passes.
- [ ] Biome CSS warnings are cleared.
- [ ] `pnpm release:check` and docs build pass.
- [ ] `plans/README.md` marks plan 003 `DONE`.

## STOP conditions

Stop and report if:

- Plans 001/002 are incomplete or the registry cannot consume their canonical
  metadata/generated package surface.
- The maintainer wants theme CSS bundled into `coss-svelte` instead of a public
  `@coss-svelte/theme` package. That is a product/package-boundary decision and
  changes this plan materially.
- Preserving current computed theme values requires a visual redesign or a new
  browser-support baseline.
- A component uses a dynamic/non-static import that the closure builder cannot
  resolve safely.
- Registry targets cannot preserve existing relative imports without rewriting
  component source. Request a reviewed registry target convention first.
- A schema expected by an external installer conflicts with the proposed local
  shape. Document the installer/schema requirement before changing output.
- The consumer smoke test needs an undeclared workspace alias or direct source
  import to pass.
- A verification fails twice after a focused correction.

## Maintenance notes

- Reviewers should open generated JSON and build the clean fixture; array-shape
  tests are not sufficient evidence.
- Future component imports must be static or accompanied by an explicit
  registry-closure strategy.
- Future docs styles belong to the docs app. Future component styles belong to
  the theme package.
- Deployment host selection remains separate. Keep base URLs configurable so a
  host change does not require regenerating source metadata.
