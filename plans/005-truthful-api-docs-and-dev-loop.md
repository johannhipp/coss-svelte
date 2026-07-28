# Plan 005: Generate truthful API docs and keep docs development live

> **Executor instructions**: Execute after plans 001–003 and 007. Generate type
> facts from the corrected built declarations; keep descriptions/defaults
> curated. Do not replace uncertainty with `Record<string, unknown>`. Update
> `plans/README.md` whenever this plan’s status changes.
>
> **Drift check (run first)**:
> `git diff --stat aced7142d97c241fb8cf62d613b72f819f883476..HEAD -- apps/www/src/lib/docs apps/www/src/lib/components/docs scripts package.json packages/coss-svelte/package.json apps/www/package.json tests README.md CONTRIBUTING.md`

## Status

- **Status**: TODO
- **Priority**: P2
- **Effort**: M/L
- **Risk**: MED
- **Depends on**:
  `plans/001-restore-bits-ui-type-fidelity.md`,
  `plans/002-coherent-composition-overlays-portals.md`,
  `plans/003-form-accessibility-locale-contracts.md`, and
  `plans/007-preview-and-code-infrastructure.md`
- **Category**: docs, DX, generated contracts
- **Planned at**: commit
  `aced7142d97c241fb8cf62d613b72f819f883476`, 2026-07-28

## Goal

Replace the hand-maintained pseudo-types in the API table with reproducible
facts from packaged declarations, while retaining curated product prose and
precise inherited-source links. Add one root development command that performs
an initial package build and then watches package output and the docs app
together.

## Proven current state

- `apps/www/src/lib/docs/api-reference.js` manually lists convenience prop names
  and handwritten type strings.
- Every element appends a generic `...rest: Record<string, unknown>`, concealing
  exact primitive/native inheritance, bindings, snippet payloads, refs, form
  props, and portal options.
- `tests/api-reference.test.mjs` parses `$props()` destructuring and checks that
  manually listed rows exist; it does not compare names/types/bindings against
  emitted declarations.
- The docs app imports `coss-svelte` from generated `dist`.
- `apps/www` starts only Vite; package source changes require a separate
  `pnpm --filter coss-svelte package:watch`.
- TypeScript 6.0.3 is already a workspace dependency. No parser dependency is
  needed.

## Scope

**In scope**

- Curated API contract seed, declaration-driven generator, generated output,
  renderer, Markdown output, and stale checks
- Exact custom/listed prop types, bindable names, children/child/ref facts, and
  inherited primitive/native source links
- Package/docs watch scripts and contributor documentation

**Out of scope**

- Expanding hundreds of native HTML attributes in each table
- Copying Bits UI prose or React/Base UI prop names
- Evaluating component source at generation time
- A general monorepo task-runner dependency
- Publishing/deploying the docs site

## Data model

### Curated input

Add `apps/www/src/lib/docs/api-contracts.js` (or a TypeScript equivalent) with
one record for every public root/part:

```js
DialogTrigger: {
  description: "Opens the surrounding dialog.",
  ownProps: [],
  inherited: {
    label: "Bits UI Dialog.Trigger",
    url: "https://bits-ui.com/docs/components/dialog#trigger"
  }
}
```

For wrapper-specific props:

```js
NumberField: {
  description: "...",
  ownProps: {
    value: { description: "...", default: "null" },
    locale: { description: "...", default: '"en-US"' }
  },
  inherited: { label: "native field wrapper" }
}
```

Curated data owns prose, meaningful defaults, source links, and the decision
about which wrapper-specific props merit rows. It must not own TypeScript type
strings or binding claims.

### Generated output

Generate `apps/www/src/lib/docs/api-reference.generated.js` with:

- anatomy order from package metadata;
- exact type string for every listed prop;
- a compact distributive signature for mode-dependent roots so correlations
  such as `type`/`value`/callback remain visible;
- bindable prop names extracted from Svelte’s component binding type;
- `children`, `child`, and `ref` types when public;
- inherited source label and URL;
- curated default and description;
- generation header containing package version/baseline, never an absolute
  path or timestamp.

The docs app imports only the generated reference. The generator is
deterministic and supports `--check`.

## Generator design

Implement `scripts/build-api-reference.mjs` with the TypeScript compiler API:

1. Require an up-to-date `packages/coss-svelte/dist/index.d.ts`; fail with a
   message directing the caller to `pnpm package:prepare` if absent.
2. Create an in-memory virtual TypeScript source whose logical path is inside
   `packages/coss-svelte`, allowing normal workspace module resolution without
   writing a temp file.
3. Import public component values from `./dist/index.js` and
   `ComponentProps`/`Component` from Svelte.
4. For each public element, create virtual aliases equivalent to:

   ```ts
   type Props = ComponentProps<typeof DialogTrigger>;
   type Public<T, K extends PropertyKey> =
     T extends unknown ? Pick<T, Extract<keyof T, K>> : never;
   type Listed = Public<Props, "open" | "value">;
   type Bindings<T> =
     T extends Component<infer _Props, infer _Exports, infer Keys>
       ? Exclude<Keys, "">
       : never;
   type DialogTriggerBindings = Bindings<typeof DialogTrigger>;
   ```

   The distributive helper preserves union branches instead of collapsing
   single/multiple contracts.
5. Ask the checker for each listed property, the compact listed signature, and
   binding-key union. Treat a broad `string` binding result as an extraction
   failure rather than claiming every prop is bindable. Print with
   `NoTruncation` and stable formatting flags.
6. Normalize only unstable import qualification/whitespace. Never regex-rewrite
   semantic types.
7. Fail on TypeScript diagnostics, unknown components, unknown listed props,
   a listed binding that is not public, duplicate anatomy entries, missing
   curated descriptions, or absolute paths in output.
8. In `--check`, generate in memory and compare byte-for-byte with the checked-in
   output.

If Svelte’s declaration form changes and the `Component` conditional can no
longer extract binding keys, stop with a focused diagnostic. Do not fall back
to a handwritten binding list.

## Implementation

### Step 1: Define and validate the curated contract

Move descriptions/defaults and wrapper-specific prop lists out of the current
monolithic `api-reference.js`. Cover every root and canonical part in metadata
order.

Add contract tests that ensure:

- every implemented metadata element has exactly one curated entry;
- deferred entries may have status prose but no fabricated API;
- every own prop has non-placeholder prose;
- every primitive-backed element identifies the exact Bits namespace/part;
- every native element identifies its Svelte/native element source;
- no inherited source is `Record<string, unknown>`.

The current source-destructuring audit may remain as a secondary warning, but
classify each destructured public name as `own`, `inherited`, or intentionally
internal. Do not treat destructuring alone as the type source.

**Verify**:

```sh
node --test tests/api-reference.test.mjs
```

### Step 2: Implement declaration-driven generation

Add the generator described above and root scripts:

```json
{
  "api:build": "pnpm package:prepare && node scripts/build-api-reference.mjs",
  "api:check": "node scripts/build-api-reference.mjs --check"
}
```

The release pipeline already packages first, so its later `api:check` must not
rebuild. Ensure a direct `pnpm api:build` is self-contained.

Add generator tests using a tiny virtual declaration fixture to prove:

- prop types change when the fixture declaration changes;
- distributive single/multiple signatures retain correlation;
- binding keys are extracted;
- missing/unknown props fail;
- output contains no absolute path;
- `--check` detects stale output.

Generate the real file and inspect at least Button, DialogTrigger, Switch,
Pagination, Slider, Select, and DialogPopup. If the live Number Field and
Context Menu spikes are still present in metadata, generate their current
contracts too, but label that output provisional: this plan validates the
generator, not those components. Plans 008 and 009 own their final curated
entries, regenerated output, and public-contract approval.

### Step 3: Render the truthful contract

Update `component-api-reference.svelte` and Markdown generation to show:

- wrapper-specific prop rows with generated type/default/description;
- a compact “Signatures” block for discriminated roots;
- visible bindable markers such as `bind:value`;
- children/child/ref facts;
- “Inherits from Bits UI Dialog.Trigger” or the exact native source as a link;
- portal options on Popup parts.

Do not expand the complete HTML attribute tail. A precise inherited source is
more readable and more truthful than hundreds of duplicated rows.

HTML and `.md` output must use the same generated data. Add snapshots or
targeted semantic assertions for the representative components above.

**Verify**:

```sh
pnpm --filter @coss-svelte/www check
node --test tests/api-reference.test.mjs
pnpm docs:smoke
```

### Step 4: Add one live root development command

Add to `packages/coss-svelte/package.json`:

```json
"dev": "pnpm package:watch"
```

Add to the root:

```json
"predev": "pnpm package:prepare",
"dev": "pnpm --parallel --filter coss-svelte --filter @coss-svelte/www run dev"
```

`predev` guarantees `dist` exists before Vite resolves the workspace package.
Use pnpm’s process orchestration; do not add `concurrently`.

Verify the actual live loop:

1. start `pnpm dev`;
2. wait for the docs route;
3. record one emitted declaration/JS mtime;
4. `touch` one package source file without changing its contents;
5. wait for package output mtime to advance;
6. verify Vite observes the output change and the component route remains
   usable;
7. send one SIGINT to the root process;
8. assert both child processes exit and their ports are released.

If Vite caches the workspace package, add only the minimal documented Vite
workspace-package configuration and prove hot update in a browser. Do not point
docs imports at private `src` paths.

Document `pnpm dev` as canonical in README/CONTRIBUTING; retain the individual
package commands for debugging.

### Step 5: Integrate stale checks

Place `pnpm api:check` after `pnpm package:prepare` and before docs build in
`release:check`. Update the exact-script assertion in
`tests/publication-readiness.test.mjs`.

Run Biome on curated/generated data. Check in generated output because the docs
build must not require mutating its source tree.

**Verify**:

```sh
pnpm package:prepare
pnpm api:check
pnpm biome:ci
pnpm release:check
```

## Acceptance criteria

- [ ] API docs contain no generic rest row as a substitute for inheritance.
- [ ] Listed prop types and binding names come from built declarations.
- [ ] Discriminated roots retain correlated signatures.
- [ ] Children/child/ref and portal facts are visible where public.
- [ ] Every primitive/native element links to an exact inherited source.
- [ ] HTML and Markdown consume one generated data file.
- [ ] `--check` detects declaration or curated-data drift deterministically.
- [ ] `pnpm dev` builds once, watches package/docs, propagates changes, and
      terminates both children on one interrupt.
- [ ] `pnpm release:check` includes and passes the API stale check.

## STOP conditions

- Stop if generation would execute arbitrary source or import component runtime
  modules; inspect declarations only.
- Stop if emitted data depends on an absolute path, local timestamp, or host
  locale.
- Stop if binding extraction cannot be proven from Svelte declarations; produce
  a minimal fixture rather than hand-maintaining the answer.
- Stop if a Vite workaround requires docs-only private package imports.
- Stop if pnpm leaves orphan processes after SIGINT; use a small owned
  orchestration script only after demonstrating the native command’s failure.

## Maintenance notes

Curated prose is expected to evolve manually. Public names, type strings,
signatures, and binding facts are generated. Re-run `api:build` whenever
Svelte, Bits UI, or a public component declaration changes.
