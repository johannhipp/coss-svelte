# Plan 004: Consolidate examples and particle catalogs into one executable source

> **Executor instructions**: Follow this plan step by step. Preserve one real
> Svelte source file as the sole authored example for each implemented root.
> Generated indexes and server-read source text are allowed; a second
> hand-maintained markup string is not. Run every verification gate and stop on
> the conditions below. Update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**:
> `git diff --stat 5d8ebb6..HEAD -- apps/www/src/lib/components/docs/component-preview-renderer.svelte apps/www/src/lib/docs/preview-examples.js apps/www/src/routes/docs/components apps/www/src/routes/particles apps/www/src/lib/components/docs/particles-browser.svelte apps/scope-catalog scripts/generate-scope-catalog.mjs tests package.json pnpm-lock.yaml`
> Plans 001 and 003 must be complete. If local registry item URLs are not
> installable, stop and complete plan 003 first.

## Status

DONE. Implemented roots now have one lazy-loaded executable example each,
server-rendered docs source comes from those files, particles point to local
registry items, and the mirrored scope-catalog app has been removed.

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: `plans/001-consolidate-component-catalog.md`,
  `plans/003-make-theme-and-registry-consumer-safe.md`
- **Category**: perf
- **Planned at**: commit `5d8ebb6`, 2026-07-15

## Why this matters

Each component demo is authored three times: executable docs markup, a string
shown as source, and a native fake in a separate scope app. The copies happen
to have 54 matching slug branches today, but they already disagree in behavior
and status: the scope app implements a fake NumberField while the package and
docs correctly defer it. The monolithic renderer also imports almost the entire
library into one route. One executable example file per implemented root lets
the preview, displayed source, Markdown endpoint, search/particles page, and
bundle graph consume the same artifact.

## Current state

- `apps/www/src/lib/components/docs/component-preview-renderer.svelte` is 1,271
  lines. It imports 228 package exports (five are unused), declares shared demo
  state/types at lines 266–360, and has 54 slug branches at lines 363–1270.
- `apps/www/src/lib/docs/preview-examples.js` is 1,259 lines. It manually repeats
  all 54 examples as template strings, including option arrays, snippet types,
  state, and markup.
- `apps/scope-catalog/src/lib/ComponentDemo.svelte` is 546 lines with a third set
  of 54 slug branches using native fake controls. Its NumberField branch at
  lines 279–284 implements increment/decrement UI despite ADR-006 deferral.
- `apps/scope-catalog/src/app.css` adds 1,092 lines of a second visual system.
- `apps/scope-catalog/src/lib/cossCatalog.ts` is a 3,025-line generated copy of
  54 roots and 484 upstream particle references. Every component repeats its
  parent category and every `particleCount` repeats `particles.length`.
- `apps/www/src/routes/particles/+page.js:4-23` invents exactly one particle per
  component and points its install URL at `https://coss.com/ui/r/...`.
- `Particle` is declared independently in the particles route and browser.
  `TocItem`, API element, sidebar, and component-page shapes have similar local
  duplicates across docs Svelte and JSDoc files.
- `apps/www/src/lib/docs/navigation.js` and the particles loader begin with
  `// @ts-nocheck`.
- A production build emits a 637.83 kB minified client chunk containing the
  shared Bits UI/component surface. The component renderer itself builds as a
  51.46 kB chunk and statically imports that shared chunk.
- Existing tests assert that the giant files contain tags/strings. They do not
  prove the displayed source is the code actually rendered.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Example check | `pnpm examples:check` | manifest/source/status invariants pass |
| Docs check | `pnpm --filter @coss-svelte/www check` | 0 errors, 0 warnings |
| Docs build | `pnpm --filter @coss-svelte/www build` | exit 0; route examples are split |
| Bundle report | `pnpm docs:bundle-report` | representative route initial graph is below the recorded baseline |
| Tests | `pnpm test` | all tests pass |
| Full gate | `pnpm release:check` | exit 0 |

## Suggested executor toolkit

- Use Vite's static `import.meta.glob` transform for the lazy component module
  map. Keep glob patterns literal so Vite can analyze them.
- Use server-only filesystem reads for source text needed by route data and
  Markdown endpoints; do not add an eager raw glob to the browser bundle.

## Scope

**In scope**:

- `apps/www/src/lib/examples/*.svelte` (create one per implemented root)
- `apps/www/src/lib/examples/index.ts` (create lazy module registry)
- `apps/www/src/lib/examples/source.server.ts` (create server-only source reader)
- `apps/www/src/lib/components/docs/component-preview-renderer.svelte`
- `apps/www/src/lib/docs/preview-examples.js` (delete)
- component docs route load/page files and Markdown endpoints
- `apps/www/src/routes/particles/**`
- `apps/www/src/lib/components/docs/particles-browser.svelte`
- shared docs types under `apps/www/src/lib/docs`
- docs navigation/API/Markdown modules needed to remove duplicate types and
  `@ts-nocheck`
- `apps/scope-catalog/**` (delete after migration)
- `scripts/generate-scope-catalog.mjs` (delete)
- scope-catalog tests (replace with example/particle contract tests)
- bundle-report script and root package scripts
- `pnpm-lock.yaml` if removing the scope app changes it

**Out of scope**:

- Converting all 484 upstream React/COSS particle variants to Svelte.
- Changing component source behavior or styling.
- Redesigning the docs page.
- Implementing deferred NumberField.
- Deleting upstream provenance in `docs/scope/source/90-particle-coverage.md`.
- Adding example-only components to `apps/www`; example files must compose the
  public package and ordinary native markup only.

## Git workflow

- Branch: `johann/004-example-manifest`
- Configure `.gitmessage.txt` before committing.
- Suggested commits:
  - `refactor(docs): render previews from example modules`
  - `refactor(docs): read displayed source from examples`
  - `refactor(particles): use local example and registry data`
  - `chore(scope-catalog): remove mirrored demo app`
  - `perf(docs): split component example chunks`
- Do not push or open a pull request unless asked.

## Steps

### Step 1: Add invariants for one example source per implemented root

Create an example-contract test derived from plan 001's canonical metadata.
Before moving files, have it express the target predicates:

1. Every non-deferred root slug has exactly one
   `apps/www/src/lib/examples/<slug>.svelte` file.
2. Deferred roots have no executable example; their docs use a generated status
   notice.
3. No example imports from package source paths.
4. No example defines another reusable Svelte component.
5. The lazy module manifest has no unknown/missing slug.
6. The source returned for a slug byte-matches the example file after newline
   normalization.
7. Particles/local install links use the local registry item slug and never
   `coss.com/ui/r`.

The test should initially fail because the example directory does not exist.

**Verify**:
`node --test tests/example-contract.test.mjs` → non-zero exit for missing
example files.

### Step 2: Extract each executable branch into its own Svelte file

Move each non-deferred branch from the current renderer into
`apps/www/src/lib/examples/<slug>.svelte`. Move branch-specific imports, state,
option arrays, snippets, and handlers with it. Preserve rendered markup and
behavior; this is an extraction, not a visual rewrite.

Rules:

- Use package imports (`coss-svelte`) and public compound parts.
- Keep state local to the example that uses it.
- Do not create shared option arrays until at least two examples genuinely need
  the same domain data and semantics.
- Do not add a `number-field.svelte`; derive its deferred notice from metadata.
- Keep experimental examples explicit and visibly labeled through page status,
  not through fake stable behavior.

Run formatting/checks in batches of roughly one component family so a broken
example is easy to locate.

**Verify after each batch**:
`pnpm biome:ci && pnpm --filter @coss-svelte/www check` → exit 0.

### Step 3: Replace the monolithic renderer with a lazy module registry

Create `apps/www/src/lib/examples/index.ts` using one literal lazy glob:

```ts
const modules = import.meta.glob("./*.svelte");
```

Normalize each filename to a slug and expose a typed `loadExample(slug)` that
returns the module or a precise missing/deferred result. Validate slugs against
canonical page data at build/test time; do not accept arbitrary paths.

Reduce `component-preview-renderer.svelte` to:

- typed `slug` input;
- an await/loading state;
- Svelte 5's supported dynamic-component rendering for the loaded default;
- a deferred/unavailable status surface derived from metadata;
- an error state that identifies the slug during development.

It must not import individual package components. Delete renderer-global demo
state and types.

**Verify**:
`rg -n 'from "coss-svelte"' apps/www/src/lib/components/docs/component-preview-renderer.svelte`
→ no matches.

**Verify**:
`pnpm examples:check && pnpm --filter @coss-svelte/www check` → exit 0.

### Step 4: Read displayed/Markdown source from the same files on the server

Create a server-only source helper that maps a validated canonical slug to the
absolute example path and reads UTF-8 text. Prevent path traversal by looking up
the slug in canonical metadata before joining paths.

Change the component docs route to server load if needed and return only the
current page's example source. Use that source for the code block and Markdown
endpoint. For deferred NumberField, generate the status notice from metadata
without pretending it is Svelte source.

Delete `apps/www/src/lib/docs/preview-examples.js`. Do not replace it with a
generated 1,200-line string object or an eager `?raw` glob shipped to every
client. Server reads and tests are the derivative view.

**Verify**:
`test ! -e apps/www/src/lib/docs/preview-examples.js` → exit 0.

**Verify**:
`pnpm examples:check` → every rendered source response matches its executable
file.

### Step 5: Make `/particles` consume local examples and local registry items

Replace `createParticle` in `apps/www/src/routes/particles/+page.js` with a
typed local example/registry record derived from canonical non-deferred docs.
Use the registry URL produced by plan 003, for example `/r/<slug>.json` through
one configurable base helper. Do not invent upstream IDs or call upstream
references local/installable particles.

Choose one honest vocabulary and use it in types/UI:

- `LocalExample` for the one executable docs example per root; or
- `LocalParticle` only if the project deliberately defines that example as its
  first local particle.

Centralize the record type in `apps/www/src/lib/docs/types.ts` and import it in
the loader, route, and browser. The browser preview must reuse the lazy example
renderer. Reuse a shared transient clipboard helper for registry URL, code, and
Markdown copy buttons instead of maintaining three timeout/onDestroy copies.

**Verify**:
`! rg -n 'coss\.com/ui/r' apps/www/src` → exit 0.

**Verify**:
`rg -n '^type Particle' apps/www/src` → no matches; one shared exported type is
used instead.

### Step 6: Remove the mirrored scope app without deleting provenance

The scope app's only unique durable data is already in
`docs/scope/source/00-component-index.md` and
`docs/scope/source/90-particle-coverage.md`. After the docs example/particle
paths work:

- delete `apps/scope-catalog`;
- delete `scripts/generate-scope-catalog.mjs`;
- remove/replace scope-catalog tests with example-manifest and raw-provenance
  parser tests;
- update README/package scripts that advertise the app;
- refresh the lockfile.

Do not delete or rewrite the raw 484-reference particle document. It remains a
research input until local variants are deliberately implemented.

**Verify**:
`test ! -d apps/scope-catalog && test ! -e scripts/generate-scope-catalog.mjs`
→ exit 0.

**Verify**:
`git diff --name-only -- docs/scope/source` → no output.

### Step 7: Centralize remaining docs domain types and authored facts

Create focused types in `apps/www/src/lib/docs/types.ts` for component pages,
API elements/props, TOC entries, sidebar/search records, and local examples.
Convert `navigation.js`, `api-reference.js`, `markdown.js`, and the particles
loader to TypeScript where needed. Remove local duplicate type blocks from
Svelte components and both `@ts-nocheck` directives.

Keep page prose in one authored data model when both a visual route and raw
Markdown endpoint publish it. For Introduction/Get Started/LLMs/Skills, render
or generate both views from the shared page sections rather than duplicating
install commands, theme imports, titles, and descriptions in route markup and
`contentPages`.

Do not attempt to infer public prop truth from JSDoc; plan 002's component types
are authoritative, while API descriptions may remain explicitly authored.

**Verify**:
`! rg -n '@ts-nocheck|^type (Particle|TocItem|ApiProp|ApiElement|ComponentPage)' apps/www/src`
→ exit 0, except for the single canonical exported declarations in
`docs/types.ts` (adjust the command to exclude that file).

### Step 8: Prove code splitting with the production manifest

Add `scripts/report-docs-bundle.mjs` that reads Vite's client manifest after a
build and reports:

- the static initial import graph for the component docs route;
- the lazy chunk for a representative simple example (Button);
- a representative complex example (Select or Dialog);
- whether the route statically reaches every component module.

Record the current baseline (637.83 kB largest shared component chunk and
51.46 kB renderer chunk) in the test/report. Require:

- the component docs route does not statically reach all example modules;
- Button navigation does not load unrelated Calendar/Dialog/Menu example code;
- the initial minified graph is materially smaller than the audited baseline;
- Vite emits separate lazy example entries.

If Rollup extracts a large shared Bits UI chunk, inspect whether it is in the
initial graph before changing manual chunks. Optimize route cost, not only file
names or the warning threshold.

**Verify**:
`pnpm --filter @coss-svelte/www build && pnpm docs:bundle-report` → exit 0 and
all four predicates pass.

### Step 9: Run the complete gate

**Verify**:
`pnpm install --frozen-lockfile && pnpm release:check && pnpm --filter @coss-svelte/www build`
→ exit 0.

## Test plan

- Manifest contract: exactly one example for each non-deferred canonical slug,
  none for deferred roots, no unknown files.
- Source identity: server-returned code byte-matches the executable example.
- Lazy loading: component docs route has no static all-example dependency.
- Particle integrity: local URL maps to an existing plan-003 registry item and
  no upstream install URL is exposed as local.
- Deferred status: NumberField renders a metadata-derived notice and no fake
  control.
- Shared docs types compile without `@ts-nocheck` or local duplicate shapes.
- Existing visual/source-shape tests are replaced with behavior/manifest tests,
  not rewritten to grep the new files.

## Done criteria

- [x] One authored `.svelte` example exists per non-deferred root.
- [x] Preview, displayed source, Markdown, and particles all consume that file.
- [x] The monolithic 54-branch renderer and `preview-examples.js` are gone.
- [x] Example modules are lazy and route bundle predicates pass.
- [x] Local particle/example records use local installable registry URLs.
- [x] Duplicate docs domain types and `@ts-nocheck` directives are removed.
- [x] The mirrored scope-catalog app/generator are gone; raw provenance remains.
- [x] Deferred NumberField has no fake executable example.
- [x] `pnpm release:check` and docs production build pass.
- [x] `plans/README.md` marks plan 004 `DONE`.

## STOP conditions

Stop and report if:

- Plans 001/003 are incomplete or a canonical slug lacks a local registry item
  for reasons other than documented deferred status.
- Extracting an example reveals that its displayed string intentionally differs
  from the executable behavior. Document the intended contract before choosing
  one.
- Vite cannot statically analyze the literal glob or the proposed loader would
  require arbitrary dynamic paths.
- Server-only source reads leak filesystem code into the client bundle.
- Removing the scope app would discard unique data not present in tracked raw
  scope documents.
- A bundle change reduces a named file but increases the component-route initial
  graph; use manifest evidence rather than accepting the superficial result.
- A step requires component implementation or visual changes.
- A verification fails twice after a focused correction.

## Maintenance notes

- New components land with one example module, canonical metadata, and an
  installable registry item in the same change.
- Upstream particle references are research data until a Svelte example is
  authored; never present upstream React JSON as local copy-and-own output.
- Reviewers should compare the rendered example with the server-returned source
  and inspect the Vite manifest, not only count files.
