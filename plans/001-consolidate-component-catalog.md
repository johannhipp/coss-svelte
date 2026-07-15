# Plan 001: Consolidate the component catalog and generate every derivative view

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the STOP conditions occurs, stop and report; do
> not improvise. When done, update this plan's row in `plans/README.md`.
>
> **Drift check (run first)**:
> `git diff --stat 5d8ebb6..HEAD -- packages/coss-svelte/src/metadata.js packages/coss-svelte/src/index.js scripts/build-component-scope.mjs scripts/generate-v0-components.mjs tests/component-scope.test.mjs tests/component-parts.test.mjs tests/registry-metadata.test.mjs package.json docs/scope`
> If any in-scope file changed, compare the current-state excerpts below with
> the live code. A material mismatch is a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `5d8ebb6`, 2026-07-15

## Why this matters

The repository currently stores the same component contract in status arrays,
part maps, full metadata, exports, generator maps, docs data, and test-local
arrays. Those copies already disagree: public metadata assigns Meter's four
parts to Badge and omits valid parts from Group, Meter, and Toolbar. A single
human-edited catalog plus generated/derived views turns those mismatches into
build failures and lowers the cost of every later package, registry, and docs
change.

## Current state

- `packages/coss-svelte/src/metadata.js` is 1,416 lines and contains four
  parallel structures:
  - lines 1–52: `stableComponents`;
  - lines 54–56: experimental and deferred arrays;
  - lines 58–237: `componentParts`;
  - lines 239–294: `componentStatus`;
  - lines 296–1416: `componentMetadata`, which repeats name, parts, and status.
- The current data is wrong in four places:
  - `metadata.js:407-423`: `Badge.parts` is
    `['MeterIndicator', 'MeterLabel', 'MeterTrack', 'MeterValue']`;
  - `metadata.js:752-768`: `Group.parts` is empty, while
    `componentParts.Group` contains `GroupSeparator`;
  - `metadata.js:875-891`: `Meter.parts` is empty, while the part map contains
    four Meter parts;
  - `metadata.js:1273-1289`: `Toolbar.parts` omits `ToolbarSeparator`.
- `packages/coss-svelte/src/index.js` manually repeats all 256 implemented
  component and part exports.
- `tests/component-scope.test.mjs:9-61` repeats all stable, experimental, and
  deferred root names instead of importing the public catalog.
- `tests/component-parts.test.mjs:5-40` and
  `tests/bits-primitive-parts.test.mjs` maintain additional part maps.
- `scripts/build-component-scope.mjs:8-35` contains its own slug/table parser,
  and lines 37–362 contain a second full implementation-strategy map.
- `scripts/generate-v0-components.mjs` is an unreferenced 3,532-line one-shot
  generator. If run, lines 3336–3529 overwrite the live component package,
  declarations, metadata, and registry source with its embedded older copies.
- Raw files under `docs/scope/source` are provenance. Keep them; they must not
  remain an independent runtime contract.

The required public exports must remain compatible:
`componentMetadata`, `componentParts`, `componentStatus`,
`stableComponents`, `experimentalComponents`, and `deferredComponents`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Format/lint | `pnpm biome:ci` | exit 0; existing CSS warnings may remain until the theme plan |
| Scope generation | `pnpm scope:check` | exit 0; checked-in scope docs are current |
| Component contract | `pnpm components:check` | exit 0; metadata, files, and exports agree |
| Tests | `pnpm test` | all tests pass |
| Full gate | `pnpm release:check` | exit 0 |

## Scope

**In scope**:

- `packages/coss-svelte/src/metadata.js`
- `packages/coss-svelte/src/index.js` (remain checked in, become generated)
- `scripts/generate-component-entrypoints.mjs` (create)
- `scripts/build-component-scope.mjs`
- `scripts/generate-v0-components.mjs` (delete)
- `tests/component-contract.test.mjs` (create)
- `tests/component-scope.test.mjs`
- `tests/component-parts.test.mjs`
- `tests/bits-primitive-parts.test.mjs` only where it repeats catalog facts
- `tests/registry-metadata.test.mjs`
- `package.json`
- generated `docs/scope/component-implementation-matrix.md`
- generated `docs/scope/component-implementation-outline.md`
- generated `docs/scope/README.md`

**Out of scope**:

- Component behavior or styling.
- Public prop typing and declaration generation; plan 002 owns that.
- Registry file closure and schemas; plan 003 owns that.
- Deleting `docs/scope/source` or changing its upstream research content.
- Reworking the scope-catalog app; plan 004 decides its fate.
- Implementing deferred NumberField.

## Git workflow

- Branch: `johann/001-component-catalog`
- Configure the template: `git config commit.template .gitmessage.txt`.
- Use focused Conventional Commits, for example:
  - `test(metadata): cover catalog invariants`
  - `refactor(metadata): derive component catalog views`
  - `chore(tooling): remove obsolete v0 generator`
- Do not push or open a pull request unless the operator asks.

## Steps

### Step 1: Add failing catalog invariants

Create `tests/component-contract.test.mjs`. Import the six existing metadata
exports and inspect `packages/coss-svelte/src/components` and `index.js`.
Cover these exact predicates:

1. Every root appears in exactly one status bucket.
2. `componentStatus[name] === componentMetadata[name].status` for every root.
3. `componentParts[name] ?? []` deep-equals
   `componentMetadata[name].parts` for every root.
4. Every listed part is unique, has a matching `.svelte` file, and is not a
   root name.
5. Every non-deferred root has a matching `.svelte` file; every deferred root
   does not have one unless its status changes in the same commit.
6. The set of `.svelte` source basenames equals non-deferred roots plus parts.
7. The set of component exports in `index.js` equals that same set.
8. Names and slugs are unique and each slug is kebab-case.

Run only the new test before changing metadata. It must fail on the four
current part mismatches. If it does not, fix the test before proceeding.

**Verify**:
`node --test tests/component-contract.test.mjs` → non-zero exit with failures
for Badge, Group, Meter, and Toolbar.

### Step 2: Make full metadata the only human-edited catalog

Reorder `metadata.js` so `componentMetadata` is defined first and contains the
canonical `status` and `parts` for every root. Correct the four mismatches.
Then derive, without repeating component names:

- `stableComponents` by filtering metadata entries with `status === 'stable'`;
- `experimentalComponents` and `deferredComponents` the same way;
- `componentStatus` with `Object.fromEntries`;
- `componentParts` from non-empty canonical `parts` arrays.

Preserve the current root ordering and all six public export names. Freeze the
outer objects and the canonical part arrays so a consumer cannot mutate shared
catalog state. Do not create a second `componentDefinitions` object containing
the same fields; `componentMetadata` itself is the authority.

**Verify**:
`node --test tests/component-contract.test.mjs` → all catalog invariant tests
pass.

### Step 3: Generate and check the public JavaScript entry point

Create `scripts/generate-component-entrypoints.mjs` with write mode and
`--check` mode. It must:

1. Import the canonical metadata.
2. Build the implemented export set from every non-deferred root and every
   listed part.
3. Sort names deterministically with `localeCompare`.
4. emit `export { default as Name } from './components/Name.svelte';` for each;
5. append the existing metadata re-exports and `cn` export;
6. in `--check` mode, compare formatted generated content with checked-in
   `index.js` and fail without writing when they differ.

Add root scripts:

```json
"components:build": "node scripts/generate-component-entrypoints.mjs",
"components:check": "node scripts/generate-component-entrypoints.mjs --check"
```

Run the build once and commit the resulting `index.js`. Add
`components:check` to the root `test` or `release:check` path so drift cannot
pass CI.

**Verify**:
`pnpm components:build && pnpm components:check && git diff --exit-code -- packages/coss-svelte/src/index.js`
→ all commands exit 0 after the generated file is staged or the working copy
matches the generated result.

### Step 4: Make scope documentation a checked derivative

Refactor `scripts/build-component-scope.mjs` to import canonical metadata for
category, slug, primitive, tier, foundation, and first-pass strategy instead
of maintaining the `foundation` map at lines 37–362. It may still parse the raw
scope index to verify that upstream provenance covers the same 54 root slugs,
but it must fail on disagreement instead of silently choosing one copy.

Add `--check` mode using the temporary-file/format/compare pattern already used
by `scripts/generate-scope-catalog.mjs`. Add root script:

```json
"scope:check": "node scripts/build-component-scope.mjs --check"
```

Generate the three scope outputs once. Review the diff: wording/order changes
are acceptable only when they are deterministic consequences of canonical
metadata; upstream source documents must not change.

**Verify**:
`pnpm scope:build && pnpm scope:check` → exit 0 and the second command reports
that all three outputs are current.

### Step 5: Remove repeated test catalogs

Update catalog-oriented tests to import the canonical exported arrays and part
map. Keep test-local maps only when they encode a real test selection (for
example, which parts a specific preview intentionally exercises), and rename
those maps to make that distinction explicit. Do not keep a second 50-name
"stable" array.

Add the metadata-parts equality assertion to
`tests/registry-metadata.test.mjs` as defense in depth, even though the new
component-contract test already checks it.

Correct the misleading test name "uses every stable component once" unless
the test also counts exactly one rendered tag. Presence-only behavior should
be named "uses every stable component".

**Verify**:
`rg -n 'const stableComponents = \[' tests` → no matches.

**Verify**:
`pnpm test` → all tests pass.

### Step 6: Delete the obsolete whole-library generator

Delete `scripts/generate-v0-components.mjs`. Confirm no package script,
workflow, document, or test references it. Its embedded source is not a useful
archive because Git history already preserves it and running it would overwrite
current work.

**Verify**:
`test ! -e scripts/generate-v0-components.mjs && ! rg -n 'generate-v0-components' . --glob '!.git/**'`
→ exit 0.

### Step 7: Run the full gate and inspect the diff

Run the frozen install and full release gate. Inspect the diff specifically for
accidental changes to raw scope research and component source.

**Verify**:
`pnpm install --frozen-lockfile && pnpm release:check` → exit 0.

**Verify**:
`git diff --name-only -- docs/scope/source packages/coss-svelte/src/components`
→ no output.

## Test plan

- New `tests/component-contract.test.mjs` covers status partitioning, metadata
  derivation, unique names/slugs/parts, source-file closure, and entrypoint
  closure.
- Existing registry metadata tests continue to prove registry roots match the
  canonical catalog.
- Existing scope-catalog generation tests remain green until plan 004 replaces
  that app.
- Generator `--check` modes are exercised through `pnpm test` or
  `pnpm release:check`.

## Done criteria

- [ ] `componentMetadata` is the only human-edited implementation catalog.
- [ ] Badge, Group, Meter, and Toolbar expose the correct canonical parts.
- [ ] Status arrays, status map, and part map are derived.
- [ ] `index.js` is deterministic generated output with a passing check mode.
- [ ] Scope outputs have a passing check mode and no duplicate foundation map.
- [ ] No test repeats the full stable component list.
- [ ] `scripts/generate-v0-components.mjs` is gone and unreferenced.
- [ ] Raw scope source and component implementation files are unchanged.
- [ ] `pnpm release:check` exits 0.
- [ ] `plans/README.md` marks plan 001 `DONE`.

## STOP conditions

Stop and report if:

- Any in-scope file materially changed since commit `5d8ebb6` and the current
  excerpts or counts no longer match.
- A public consumer relies on status-array insertion order that cannot be
  preserved by deriving the arrays.
- A part name legitimately belongs to multiple roots; the proposed uniqueness
  invariant would then need an explicit ownership model reviewed first.
- Scope source contains a root that is intentionally absent from package
  metadata, other than the documented deferred NumberField case.
- Generating `index.js` would require importing or executing component modules.
  Generation must use metadata and file names only.
- Any step requires changing component behavior or raw upstream source docs.
- A verification fails twice after a focused correction.

## Maintenance notes

- Adding a root or part after this plan means editing canonical metadata and
  running the component/scope generators; hand-editing `index.js` is no longer
  supported.
- Reviewers should scrutinize whether every field in canonical metadata is
  implementation truth. Upstream-only research belongs in `docs/scope/source`,
  not in another runtime map.
- Plan 004 may later remove the scope-catalog app. Do not make plan 001 depend
  on that app's generated TypeScript shape.
