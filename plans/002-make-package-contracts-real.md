# Plan 002: Make package validation and public component contracts real

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before continuing. If a
> STOP condition occurs, stop and report; do not hide errors with `any`,
> `unknown` index signatures, `@ts-ignore`, or disabled diagnostics. When done,
> update this plan's row in `plans/README.md`.
>
> **Drift check (run first)**:
> `git diff --stat 5d8ebb6..HEAD -- packages/coss-svelte package.json pnpm-lock.yaml biome.json apps/www/package.json apps/www/svelte.config.js docs/references/version-baseline.md tests`
> Plan 001 must be complete. If canonical metadata or generated entrypoints are
> not present, stop and execute plan 001 first.

## Status

DONE. Package source is checked, every generated declaration has a concrete
props contract, and the declaration contract test rejects `any`/record escape
hatches.

- **Priority**: P1
- **Effort**: L
- **Risk**: HIGH
- **Depends on**: `plans/001-consolidate-component-catalog.md`
- **Category**: migration
- **Planned at**: commit `5d8ebb6`, 2026-07-15

## Why this matters

The package currently gives TypeScript consumers no component API: all 256
exports are declared as the same `Component<Record<string, unknown>>`. The
normal release gate also skips package source because the package has no
`check` script. This plan makes package source a first-class checked workspace,
generates declarations from the actual Svelte components, and requires each
public part to carry a truthful props contract.

## Current state

- `packages/coss-svelte/src/index.d.ts:1-3` defines:

  ```ts
  import type { Component } from "svelte";
  type AnyComponent = Component<Record<string, unknown>>;
  ```

  Lines 5–260 apply that declaration to every public component.
- `packages/coss-svelte/package.json:8-21` publishes source files directly and
  points `types` at the handwritten `src/index.d.ts`.
- `packages/coss-svelte/package.json` has no scripts or development
  dependencies. Therefore root `pnpm check` only checks the two SvelteKit apps.
- A direct command against the package:

  ```sh
  pnpm --filter @coss-svelte/www exec svelte-check \
    --workspace ../../packages/coss-svelte --no-tsconfig --fail-on-warnings
  ```

  reports four warnings in `Combobox.svelte:44-48`: two clickable non-interactive
  divs lack keyboard handling and roles.
- `pnpm -r --if-present build` repeats those four warnings, while
  `pnpm release:check` exits 0. The release gate is therefore a false green for
  component compiler/accessibility diagnostics.
- Component scripts are currently untyped JavaScript. Their `$props()`
  destructuring, native rest props, Bits UI props, snippets, events, and
  bindable values are not represented in consumer types.
- `biome.json:51-62` disables unused imports and variables for all Svelte files.
  The docs renderer currently contains five unused package imports that pass.
- `tailwind-variants` is declared in both the component and docs packages but
  has no source import. Metadata still claims Button uses it.

The official Svelte packaging guide documents `@sveltejs/package`, generated
Svelte/JavaScript/TypeScript declarations, and `dist` export conditions:
<https://svelte.dev/docs/kit/packaging>.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Package check | `pnpm --filter coss-svelte check` | 0 errors, 0 warnings |
| Generate package | `pnpm --filter coss-svelte package` | deterministic `dist` output with declarations |
| Type consumer | `pnpm test:type-consumer` | exit 0; positive and negative assertions hold |
| Docs check | `pnpm --filter @coss-svelte/www check` | 0 errors, 0 warnings |
| Docs build | `pnpm --filter @coss-svelte/www build` | exit 0 and no component a11y warnings |
| Full gate | `pnpm release:check` | exit 0 |

## Suggested executor toolkit

- Use the `typescript-best-practices` and type-system-discipline guidance when
  defining props. Parse external/native/primitive props at component
  boundaries; do not weaken internal types to make migration errors disappear.
- Use the official packaging guide linked above for the current
  `svelte-package` export layout.

## Scope

**In scope**:

- `packages/coss-svelte/package.json`
- `packages/coss-svelte/svelte.config.js` (create if required by packaging)
- `packages/coss-svelte/tsconfig.json` (create)
- `packages/coss-svelte/src/**/*.svelte`
- `packages/coss-svelte/src/index.d.ts` (delete after generated declarations
  are proven)
- `packages/coss-svelte/dist` (generated, ignored, never hand-edited)
- `.gitignore`
- root `package.json`
- `pnpm-lock.yaml`
- `biome.json`
- `apps/www/package.json` only for removing an unused dependency
- `docs/references/version-baseline.md`
- `tests/type-consumer/**` (create)
- `tests/package-contract.test.mjs` (create)

**Out of scope**:

- Visual redesigns, class-name changes, or component renames.
- Changing stable/experimental/deferred status.
- Redesigning root convenience APIs; add truthful types for the current API.
- Registry generation and theme packaging; plan 003 owns those surfaces.
- Field behavior; plan 005 owns semantic wiring.
- Adding ESLint or Prettier.

## Git workflow

- Branch: `johann/002-package-contracts`
- Configure the commit template: `git config commit.template .gitmessage.txt`.
- Commit in verifiable units, for example:
  - `build(package): add component validation pipeline`
  - `fix(combobox): move open interaction to the input`
  - `refactor(types): type public component props`
  - `test(package): add clean type consumer`
- A public prop narrowing that rejects previously accepted code is a breaking
  change. Record it explicitly rather than silently changing the API.
- Do not push or open a pull request unless asked.

## Steps

### Step 1: Put package source inside the existing check gate

Add exact development dependencies to `packages/coss-svelte` using versions
compatible with the audited workspace:

```sh
pnpm add --save-dev --filter coss-svelte \
  @sveltejs/package@2.5.8 svelte-check@4.6.0 typescript@6.0.3
```

Create a package `tsconfig.json` suitable for Svelte 5 library source. Include
`src/**/*.svelte`, `src/**/*.ts`, and `src/**/*.js`; enable strict checking and
`checkJs` during the migration. Do not extend either app's generated
`.svelte-kit/tsconfig.json`.

Add package scripts:

```json
"check": "svelte-check --workspace . --tsconfig ./tsconfig.json --fail-on-warnings",
"package": "svelte-package -i src -o dist",
"package:watch": "svelte-package -i src -o dist --watch",
"prepack": "pnpm package"
```

Ignore `packages/coss-svelte/dist`. Update
`docs/references/version-baseline.md` with the new packaging tool and why it is
part of the release path.

At this point the package check is expected to fail. Capture the complete error
list and group it by component family before editing source.

**Verify**:
`pnpm --filter coss-svelte check` → non-zero exit that includes the four
existing Combobox warnings; no "no files found" or configuration error.

### Step 2: Fix the real Combobox accessibility warning at its source

In `packages/coss-svelte/src/components/Combobox.svelte`, remove click handlers
from non-interactive wrapper divs. Opening from pointer/focus belongs on the
actual `ComboboxPrimitive.Input` or exported `ComboboxInput` control. Keep root
event props on the Bits UI root rather than manually invoking `rest.onclick`
from a wrapper.

Preserve these behaviors:

- focusing/clicking the default input opens the list;
- a custom compound input can control open state through Bits UI/root binding;
- keyboard users do not need an extra synthetic wrapper action;
- user-supplied root handlers are forwarded once, not duplicated.

Do not add a role or tabindex to the wrapper merely to silence the compiler.

**Verify**:
`pnpm --filter coss-svelte check` → the four Combobox accessibility warnings
are absent. Other type migration diagnostics may remain.

### Step 3: Type component boundaries family by family

Convert public component scripts to `lang="ts"` in small verified batches. Use
these rules consistently:

- Native elements use the corresponding types from `svelte/elements` and keep
  valid native/data/ARIA props. Do not use `Record<string, unknown>` for rest
  props.
- Bits UI wrappers derive primitive props with `ComponentProps<typeof
  Primitive.Part>` and use `Omit` only for props the wrapper intentionally
  replaces.
- Render snippets use `Snippet<...>` with their real argument shapes.
- Bindable values have one explicit value type that matches Bits UI and the
  documented component mode. Do not claim scalar and array values are
  interchangeable unless runtime code supports both.
- Variant/size/state values use literal unions when the implementation only
  handles a closed set. If arbitrary custom strings are intentionally accepted,
  document that separately instead of weakening every prop.
- Polymorphic components such as Button use a discriminated union for anchor
  versus button semantics so `href`, `disabled`, and `type` are not presented
  as one impossible state.
- Shared internal types live in focused files under
  `packages/coss-svelte/src/internal`; do not recreate the same option, range,
  or snippet type in multiple components.
- Do not change runtime markup/classes in a type-only batch.

Recommended batch order, running the package check after each:

1. native leaf components and internal `Block`/`cn` boundaries;
2. presentational compounds (Alert, Card, Empty, Frame, Table, InputGroup);
3. native form controls;
4. direct Bits UI wrappers;
5. overlay/collection compounds;
6. experimental Drawer, Sidebar, and Toast, preserving their experimental
   status and current limitations.

If `Block.svelte` cannot express exact rest attributes for arbitrary tags,
prefer a small set of typed native wrapper components or direct markup over a
single type-erasing generic.

**Verify after each batch**:
`pnpm --filter coss-svelte check` → the diagnostic count only decreases; no new
warnings are accepted.

**Verify after the last batch**:
`pnpm --filter coss-svelte check` → 0 errors and 0 warnings.

### Step 4: Generate declarations and publish the generated package surface

Run `svelte-package` and inspect `dist/index.d.ts` plus representative leaf,
compound, overlay, form, and experimental declarations. Then update package
fields to the generated layout:

- `files`: `dist` (README and LICENSE are included by npm automatically);
- `svelte`: `./dist/index.js`;
- `types`: `./dist/index.d.ts`;
- root export `types`, `svelte`, and `default`: generated `dist/index.*`;
- metadata subpath: generated `dist/metadata.js` and `dist/metadata.d.ts`.

Delete the handwritten `src/index.d.ts` only after the generated declarations
contain all public roots, parts, metadata exports, and `cn`.

Wire workspace commands so a clean checkout never imports a missing `dist`:

- add a root `components:package` script;
- make root check/test/build entry points run it before workspace consumers;
- add a root development command that performs one build and runs
  `package:watch` alongside the docs app;
- keep `dist` untracked.

Do not rely on a developer having run packaging manually.

**Verify**:
`rm -rf packages/coss-svelte/dist && pnpm check` → the command regenerates
`dist` and all workspace checks pass.

**Verify**:
`test -f packages/coss-svelte/dist/index.d.ts && ! rg -n 'AnyComponent|Component<Record<string, unknown>>' packages/coss-svelte/dist packages/coss-svelte/src`
→ exit 0.

### Step 5: Add a clean TypeScript consumer contract

Create `tests/type-consumer` as a minimal Svelte/TypeScript consumer that
imports from `coss-svelte` and `coss-svelte/metadata`, never from source paths.
Add positive checks for at least:

- native Button and anchor Button forms;
- a bindable Bits UI wrapper value;
- a compound overlay root plus parts;
- Field/Input composition (behavior remains plan 005);
- metadata status and part types.

Add negative `@ts-expect-error` checks for:

- a made-up prop that is neither native nor data/ARIA;
- the wrong value type for Slider/ToggleGroup/Select mode;
- anchor-only props on a button-only branch and vice versa;
- an invalid metadata status.

Expose a root `test:type-consumer` script and run it in `pnpm test`. The test
must consume freshly generated `dist`, not the source declarations.

**Verify**:
`pnpm test:type-consumer` → exit 0 with all `@ts-expect-error` directives used.

### Step 6: Re-enable dead-code diagnostics and remove proven dead config

Once all package and docs Svelte files pass, remove the blanket
`noUnusedImports`/`noUnusedVariables` override in `biome.json`, or narrow it to
the smallest unavoidable generated-file exception with an explanatory ADR.
Remove the five currently unused renderer imports.

Remove `tailwind-variants` from `packages/coss-svelte/package.json` and
`apps/www/package.json` only after this command returns no source use:

```sh
rg -n 'tailwind-variants|\btv\(' packages apps scripts tests
```

Update the lockfile and version baseline. Also correct metadata/outline wording
that says Button uses `tailwind-variants`, because runtime code uses explicit
class maps.

**Verify**:
`pnpm biome:ci && pnpm --filter coss-svelte check && pnpm --filter @coss-svelte/www check`
→ exit 0; no unused import/variable diagnostics.

### Step 7: Prove a fresh package and docs build

Run the full release gate and an explicit docs production build. Inspect the
npm dry-run to confirm declarations come from `dist` and all public component
files needed by those declarations are included.

**Verify**:
`pnpm install --frozen-lockfile && pnpm release:check && pnpm --filter @coss-svelte/www build`
→ exit 0, package check runs, and the four Combobox warnings do not appear.

## Test plan

- Package-level Svelte diagnostics run with warnings as failures.
- `tests/package-contract.test.mjs` verifies the package manifest points to
  generated files, `src/index.d.ts` is absent, and the packed file list contains
  generated declarations.
- `tests/type-consumer` exercises valid imports and compile-time rejection of
  invalid props/value states.
- Existing static tests remain green during migration, but do not use them as a
  substitute for the new package/type gates.
- Plan 005 adds runtime DOM behavior tests after this type foundation exists.

## Done criteria

- [x] `pnpm --filter coss-svelte check` runs in the normal root gate and has 0
      errors/warnings.
- [x] Every public Svelte component has a truthful typed props boundary.
- [x] No public declaration uses `AnyComponent`, `any`, or
      `Component<Record<string, unknown>>` as an escape hatch.
- [x] `@sveltejs/package` produces deterministic generated declarations.
- [x] A clean checkout regenerates package output before any workspace consumer
      needs it.
- [x] Positive and negative type-consumer tests pass.
- [x] Combobox build accessibility warnings are fixed at the interactive input.
- [x] Blanket Svelte unused-code exemptions are removed or narrowly justified.
- [x] Unused `tailwind-variants` dependencies and stale Button strategy text are
      removed.
- [x] `pnpm release:check` and the docs production build exit 0.
- [x] `plans/README.md` marks plan 002 `DONE`.

## STOP conditions

Stop and report if:

- Plan 001 is not complete or generated entrypoints disagree with source.
- A generated declaration is less specific than the existing runtime behavior
  and fixing it would require a public API decision not described here.
- A component needs `any`, an unchecked cast, or a generic unknown-prop record
  to pass. Isolate the exact type-design problem for review.
- Moving exports to `dist` breaks clean workspace development after the planned
  prebuild/watch wiring. Do not commit a workflow that only works after a
  manual hidden step.
- A type change rejects documented consumer syntax. Treat that as a breaking
  API decision and request approval.
- Fixing a compiler warning appears to alter keyboard, focus, form, or overlay
  behavior without a runtime test.
- A verification fails twice after a focused correction.

## Maintenance notes

- Reviewers should inspect generated declarations, not only source `Props`
  types. The packed artifact is the consumer contract.
- Future components must add package-level diagnostics and type-consumer cases
  in the same change as their exports.
- Keep the exact packaging-tool versions recorded in
  `docs/references/version-baseline.md` and update that file with dependency
  changes.
- The docs API reference remains a separate authored representation until plan
  004 centralizes docs types/content. Do not claim it is type-generated yet.
