# Plan 010: Enforce catalog completion across every published surface

> **Executor instructions**: Plans 004, 005, 007, 008, and 009 must be
> complete. Reconcile the current uncommitted catalog test, production crawls,
> clean-consumer expansion, metadata, examples, generated files, and component
> spikes instead of replaying them. Update `plans/README.md` whenever this
> plan's status changes.
>
> **Drift check (run first)**:
> `git diff --stat aced7142d97c241fb8cf62d613b72f819f883476..HEAD -- package.json packages apps docs scripts tests`
>
> Then inspect:
> `git diff -- tests/catalog-completeness.test.mjs scripts/smoke-docs-server.mjs scripts/smoke-docs-browser.mjs scripts/check-clean-consumer.mjs packages/coss-svelte/src/metadata.js packages/coss-svelte/src/index.js apps/registry/static/r/index.json`

## Status

- **Status**: DONE
- **Priority**: P0 release gate
- **Effort**: M
- **Risk**: MED
- **Depends on**:
  `plans/004-component-family-behavior-verification.md`,
  `plans/005-truthful-api-docs-and-dev-loop.md`,
  `plans/007-preview-and-code-infrastructure.md`,
  `plans/008-implement-number-field.md`,
  `plans/009-implement-context-menu.md`
- **Category**: release, docs, registry, test
- **Planned at**: commit
  `aced7142d97c241fb8cf62d613b72f819f883476`, 2026-07-28

## Goal

Turn "all canonical components are implemented" into a release invariant
joined across metadata, package source, declarations, examples, generated
registry files, production HTML/Markdown routes, and isolated consumers.

This plan is the final integration gate. It does not replace the family-level
behavior tests in plans 004, 008, and 009.

## Proven Live State

The dirty worktree now reports, from `componentMetadata`:

- 55 roots;
- 52 stable roots;
- 3 experimental roots (Drawer, Sidebar, Toast);
- 0 deferred roots;
- 279 canonical root/part exports;
- 55 `.svelte` examples;
- 55 registry item files plus `index.json`.

These are expected review totals, not constants for tests.

The worktree also contains uncommitted implementations of:

- `tests/catalog-completeness.test.mjs`;
- an all-component production route crawl;
- expanded docs-browser canaries;
- a three-item clean registry/package consumer;
- Number Field and Context Menu sources/examples/registry metadata.

A read-only run of the current catalog test passes. That proves only that its
current cross-surface assertions agree with the current filesystem and existing
declarations. It does **not** prove:

- generated output is fresh;
- Number Field or Context Menu meets plans 008/009;
- the built docs routes work;
- browser hydration/interactions/accessibility pass;
- registry copies build in an isolated consumer;
- `release:check` is green.

Treat all live gate code as a candidate implementation to reconcile, not as
evidence that the roadmap is complete.

## Sources of Truth and Ownership

| Surface | Authority | This plan proves |
|---|---|---|
| Catalog | `componentMetadata` and canonical `parts` | exact root/slug/status membership |
| Package source | `packages/coss-svelte/src/components` | every canonical element exists |
| Package exports | generated `src/index.js` | every canonical element is exported once |
| Types | generated `dist/**/*.d.ts` | canonical declaration exists; plan 001 owns fidelity/no-`any` depth |
| Examples | `apps/www/src/lib/examples/*.svelte` | one non-empty executable source per root |
| Code source | plan 007's eager raw glob | same example source reaches Code/Markdown |
| Registry | generated `apps/registry/static/r` | one item per root and complete non-empty closure |
| Docs runtime | adapter-node build | every HTML and Markdown route responds successfully |
| Behavior | plans 004, 008, 009 | family and high-risk interactions |
| Consumption | packed package/theme plus copied registry items | public and copy-owned builds are self-contained |

No test in this plan should reimplement every detailed assertion from the
surface owner. The catalog test is a **join**: it catches an element present on
one surface and missing from another.

## Release Invariants

For every `[root, metadata]` pair:

1. status is `stable` or `experimental`;
2. slug is unique and canonical;
3. `[root, ...metadata.parts]` each have one package source;
4. generated package index exports each element;
5. a generated declaration exists for each element;
6. one non-empty `<slug>.svelte` example exists and imports the public package;
7. executable and raw example manifests address the same source pattern;
8. registry index contains one item with the same root, slug, status, and path;
9. the registry item contains every canonical element plus any private source
   closure, with unique non-empty targets and declared external dependencies;
10. built `/docs/components/<slug>` returns HTML 200 and renders a real preview;
11. built `/docs/components/<slug>.md` returns Markdown/plain text 200 and
    contains the exact normalized example source;
12. switching to Code in a browser exposes that exact source without changing
    the preview frame contract.

Global invariants:

- metadata has no deferred root;
- root names and slugs are unique;
- package, example, registry-index, and route sets equal the metadata set;
- no page displays deferred, missing-example, failed-example, or blank-preview
  states;
- Drawer, Sidebar, and Toast remain accurately experimental;
- no fixed test count is used as the source of truth.

Future component work stays in backlog/scope planning until its vertical slice
is ready. Adding a deferred root to canonical release metadata intentionally
fails this gate.

## Implementation

### Step 0: Reconcile the live gate and component spikes

Before changing the gate:

1. inventory all dirty/untracked component, metadata, generated, example,
   script, docs, and test files;
2. map each file to plans 002/003/007/008/009/010;
3. retain correct live work without weakening the contracts defined by those
   plans;
4. remove aspirational docs claims until their owning plan's acceptance
   criteria are met;
5. do not regenerate over dirty scope/registry/index files until their source
   edits are reconciled.

Run the current static test once as a baseline, but record it as `baseline`, not
as final completion evidence:

```sh
node --test tests/catalog-completeness.test.mjs
```

### Step 1: Keep one focused cross-surface join

Reconcile `tests/catalog-completeness.test.mjs`.

Derive:

```js
const roots = Object.entries(componentMetadata);
const canonicalElements = [root, ...metadata.parts];
```

Assert exact set equality across metadata, package-index exports, examples,
registry-index items, and generated registry item filenames. Include duplicate
root/slug/path diagnostics before converting arrays to maps so duplicates
cannot disappear silently.

For each root, report failures prefixed with both root and slug.

The join owns:

- source/declaration/example/registry presence;
- non-empty example and registry file content;
- canonical registry targets as a subset of the private closure;
- matching names/slugs/statuses;
- public package import in the example.

Delegate:

- declaration quality to `tests/package-contract.test.mjs` and plan 001;
- exact primitive classification to `tests/bits-primitive-parts.test.mjs`;
- closure import resolution to `tests/registry-closure.test.mjs`;
- example source-loader mechanics to `tests/example-contract.test.mjs`;
- generated freshness to each `*:check` command.

Refactor duplicated deep assertions rather than allowing two tests to drift.
The catalog join may assert a declaration is present/non-empty, but it should
not become a second declaration parser.

**Verify**:

```sh
node --test tests/catalog-completeness.test.mjs tests/package-contract.test.mjs tests/example-contract.test.mjs tests/registry-metadata.test.mjs tests/registry-closure.test.mjs
```

### Step 2: Prove generated artifacts are fresh

After plans 008/009 source and metadata are final, run the write-mode generators
once:

```sh
pnpm package:index
pnpm scope:build
pnpm registry:build
```

Inspect the diff and ensure it contains only reconciled source changes. Then
use check mode:

```sh
pnpm package:prepare
pnpm package:index:check
pnpm scope:check
pnpm registry:check
pnpm theme:check
pnpm examples:check
```

`package:prepare` must precede declaration-presence tests. Check-mode generators
must generate in temporary paths or compare without modifying tracked output.

Review totals can be printed in the handoff, but tests derive them from current
metadata. The expected completed review snapshot is 55 roots, 52 stable, 3
experimental, 0 deferred, 55 examples, and 279 component exports.

### Step 3: Crawl every built component route

Reconcile `scripts/smoke-docs-server.mjs`.

After one adapter-node build:

1. start the built server on a reserved loopback port;
2. wait for `/docs/introduction`;
3. fetch `/r/index.json` and compare its root/slug set to canonical metadata;
4. crawl canonical slugs with bounded concurrency (six is sufficient);
5. request HTML and Markdown routes for every slug;
6. validate status and content type;
7. collect every failure and throw one grouped diagnostic;
8. always terminate the server, escalating from SIGTERM to SIGKILL only after
   a bounded timeout.

HTML assertions:

- `data-preview-slug="<slug>"` exists;
- no deferred/missing/failed-example copy exists;
- route title/root marker corresponds to metadata;
- Preview/Code controls are discoverable when the server renders them.

Do not require the inactive Code panel to be force-mounted in SSR. Browser
tests own switching tabs and reading Code.

Markdown assertions:

- normalize only line endings and trailing EOF whitespace;
- exact executable example source occurs in its code section;
- no placeholder/failure copy appears.

Reading local example files is valid in the smoke harness; the production app
itself must continue using plan 007's Vite-bundled raw map.

Also request:

- `/docs/components` and verify all canonical navigation links;
- `/llms.txt`;
- registry index/item/schema endpoints.

**Verify**:

```sh
pnpm --filter @coss-svelte/www build
node scripts/smoke-docs-server.mjs
```

### Step 4: Run shallow browser integration canaries

Reconcile `scripts/smoke-docs-browser.mjs`. Keep deep behavior in plans
004/008/009; this script proves that real docs examples hydrate and connect to
the published package.

Required canaries:

- introduction loads, theme toggles, search opens/closes, and axe has no
  critical/serious findings;
- Button, Number Field, and Context Menu switch Preview -> Code -> Preview;
- Code contains the exact public import and does not change frame geometry
  beyond a small layout tolerance;
- plan 007's long-line fixture proves internal horizontal scrolling/copy-rail
  protection;
- Number Field's docs spinbutton performs one Arrow step and exposes the
  resulting semantic value;
- Context Menu opens once by right-click, closes/restores focus, and opens once
  by Shift+F10;
- axe runs on the Number Field preview and an open Context Menu;
- 390x844 Number Field and Context Menu pages have no document-level horizontal
  overflow and the popup remains in the viewport;
- dark theme and reduced-motion contexts retain usable component pages.

Avoid a brittle exact 450px equality. Assert the desktop frame satisfies plan
007's minimum and that tab switching does not unexpectedly resize the frame.
Await roles, state, focus, and layout; never sleep for animation duration.

If a deeper Number Field/submenu test fails here, move its detailed coverage to
the owning plan's guarded fixture and keep only one docs-route canary.

Build the docs once for the final release sequence. Retain convenient standalone
commands that build first, but add built-artifact variants so `release:check`
does not rebuild the same source for server and browser smoke:

```json
{
	"docs:smoke:built": "node scripts/smoke-docs-server.mjs",
	"test:browser:built": "node scripts/smoke-docs-browser.mjs",
	"docs:release-gate": "pnpm --filter @coss-svelte/www build && pnpm docs:smoke:built && pnpm test:browser:built"
}
```

Exact script names may follow repository convention; their ownership and
single-build behavior must remain clear.

### Step 5: Build package and registry copies in one clean consumer

Reconcile `scripts/check-clean-consumer.mjs`.

Create one temporary SvelteKit fixture from packed `coss-svelte` and theme
tarballs. Install three generated registry items into the same `$lib` tree:

- Button: presentational baseline;
- Number Field: custom state/context/helper closure;
- Context Menu: Bits-backed multi-part/Portal closure.

Registry copying must:

- resolve every target under the fixture source using a platform-safe relative
  containment check;
- allow duplicate targets only when content is byte-identical;
- fail with both item names when duplicate target content conflicts;
- preserve `.ts`/`.svelte.ts` extensions and relative imports;
- never read from docs aliases or workspace-only source after copying.

Dependency construction must:

- derive versions from workspace package/peer contracts;
- include every external dependency declared by all three registry items;
- fail on an unknown dependency instead of adding an ad hoc version;
- use only packed packages and normal published peer dependencies.

The fixture page renders both package and registry-copy forms:

- a named Number Field in a native form;
- a Context Menu target, Popup, and Item;
- the copied Button.

Run SvelteKit sync, strict `svelte-check`, and a production Vite build. Test
behavior remains in the package/browser fixtures; this gate proves isolated
installability and source closure.

Always clean the temporary directory in `finally`. A failure message should
retain command stdout/stderr while not leaking the temp directory into git.

**Verify**:

```sh
pnpm test:consumer
```

### Step 6: Reconcile user-facing completion claims

Search:

```sh
rg -n "NumberField|Number Field|ContextMenu|Context Menu|deferred|not implemented" README.md docs apps packages tests
```

Update current-status prose only after the corresponding gates pass:

- Number Field is stable under its documented custom contract;
- Context Menu is a complete stable vertical slice;
- neither claims full particle or Base UI parity;
- Drawer, Sidebar, and Toast remain experimental;
- historical/upstream references may retain old React terminology when clearly
  labeled;
- defensive deferred rendering branches may remain, but canonical release
  metadata cannot currently reach them.

Capture ignored visual parity evidence for Number Field and Context Menu after
deterministic checks pass. Review it manually; do not make screenshot equality
a release invariant or commit `.cache/visual-parity`.

### Step 7: Wire the final release gate

Run focused checks first for actionable failures, then the complete gate.
`release:check` must include:

- generated contract checks;
- static catalog join;
- package/runtime/SSR/type tests;
- clean consumer;
- one docs build followed by production crawl and browser smoke;
- package dry run.

Do not silently skip a component, route, axe finding, or consumer item to make
the gate green.

## Files

### Reconcile existing uncommitted files

- `tests/catalog-completeness.test.mjs`
- `scripts/smoke-docs-server.mjs`
- `scripts/smoke-docs-browser.mjs`
- `scripts/check-clean-consumer.mjs`
- root `package.json`
- current metadata/index/examples/registry/docs changes from plans 007–009

### Modify only if the reconciled invariant requires it

- `apps/www/src/lib/examples/index.ts`
- `apps/www/src/lib/examples/source.server.ts`
- docs preview/renderer components
- current-status documentation found by the scoped search

Do not remove defensive preview result states merely because release metadata
currently makes them unreachable.

## Verification Sequence

### Focused cross-surface checks

```sh
pnpm package:prepare
node --test tests/catalog-completeness.test.mjs tests/component-contract.test.mjs tests/example-contract.test.mjs tests/package-contract.test.mjs tests/registry-metadata.test.mjs tests/registry-closure.test.mjs
pnpm package:index:check
pnpm scope:check
pnpm registry:check
pnpm theme:check
pnpm examples:check
```

### Behavior and consumers

```sh
pnpm --filter coss-svelte test
pnpm --filter coss-svelte test:ssr
pnpm test:type-consumer
pnpm test:consumer
pnpm docs:release-gate
```

### Full publish-facing proof

```sh
pnpm install --frozen-lockfile
pnpm biome:ci
pnpm check
pnpm release:check
```

The focused sequence is for diagnosis. Passing duplicated subcommands does not
replace the final `release:check`.

## Completion Evidence to Record

In the implementation handoff, report:

- metadata-derived stable/experimental/deferred/root totals;
- metadata-derived canonical export and example totals;
- generator check results;
- Number Field plan 008 evidence;
- Context Menu plan 009 evidence;
- HTML/Markdown crawl count and grouped result;
- docs browser/mobile/dark/reduced-motion/axe result;
- package plus three-item registry clean-consumer result;
- package dry-run result;
- final `pnpm release:check` result;
- ignored parity-evidence path, if captured.

Do not report "all implemented" from the static catalog test alone.

## Acceptance Criteria

- Canonical metadata contains 55 roots and no deferred root, derived rather
  than hardcoded in tests.
- Package source/export/declaration, example, registry-index/item, and route
  sets exactly match metadata.
- Every built component HTML and Markdown route returns the expected content.
- Every Preview/Code surface uses its executable Svelte example.
- No current page shows deferred, missing, failed, or blank preview state.
- Family/high-risk behavior gates from plans 004/008/009 pass.
- Normal docs routes hydrate for both new roots at desktop/mobile, dark theme,
  and reduced motion, with required axe checks.
- Packed package and Button/Number Field/Context Menu registry copies build in
  one isolated strict SvelteKit consumer.
- Generated output is fresh and preserves reconciled user work.
- `pnpm release:check` passes without exclusions.

## Stop Conditions

Stop rather than weakening the gate if:

- any root remains intentionally deferred after plans 008/009;
- a declaration passes only because stale `dist` output exists;
- a production route needs runtime source filesystem access;
- a registry item needs undeclared workspace/docs paths;
- the all-route crawl exposes an older empty or runtime-failing example;
- browser assertions duplicate unstable primitive internals instead of public
  behavior;
- an axe finding is suppressed without a documented false-positive analysis;
- generators would overwrite unreconciled user changes;
- the full gate passes only by excluding a root, route, or consumer item.
