# Plan 001: Restore Bits UI type fidelity across public wrappers

> **Executor instructions**: Follow every step and run each verification.
> Preserve unrelated worktree changes. Update this plan's row in
> `plans/README.md` when finished.
>
> **Drift check (run first)**:
> `git diff --stat aced7142d97c241fb8cf62d613b72f819f883476..HEAD -- packages/coss-svelte/src packages/coss-svelte/tests scripts/check-type-consumer.mjs`
> Then run `git diff -- packages/coss-svelte/src` to detect uncommitted overlap.

## Status

- **Status**: TODO
- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: none
- **Category**: bug, migration, types
- **Planned at**: commit
  `aced7142d97c241fb8cf62d613b72f819f883476`, 2026-07-28

## Why this matters

coss-svelte promises Svelte-native Bits UI composition, but many wrappers
replace the primitive's public type with generic HTML attributes. Other roots
flatten Bits UI discriminated unions, so `type="single"` can be paired with an
array value or callback. Correct declarations are part of the published API and
must reject illegal states while retaining supported Bits UI behavior.

## Current state

- `packages/coss-svelte/src/internal/props.ts:18-25` defines `NativeProps` as
  `HTMLAttributes<HTMLElement>` plus a zero-argument `children`.
- `DialogTrigger.svelte` and roughly 68 other files render a Bits primitive but
  declare `NativeProps`. The generated trigger declaration consequently lacks
  Bits UI's `child`, `ref`, typed style, and button attributes.
- `Switch.svelte:6-17` uses `NativeProps`, omitting Bits UI form props such as
  `name`, `required`, `disabled`, `value`, and `onCheckedChange`.
- Bits UI 2.18.1 itself has three public `any` leaks that would otherwise pass
  straight through derived wrapper props: Checkbox Root/Group `name`, Switch
  Root `value`, and PinInput Root `onComplete`. Installed runtime source proves
  that PinInput invokes `onComplete(value)` with one string; the form props
  become native hidden-input names/values.
- `Pagination.svelte:15` declares `children?: Snippet<[unknown]>`, although the
  render call at lines 38-40 passes `{ pages, range, currentPage }`.
- Accordion, Calendar, Slider, Select, Combobox, Autocomplete, and ToggleGroup
  manually pair `type?: "single" | "multiple"` with union value/callback types.
- ADR-001 requires Svelte snippets, bindings, and Bits UI behavior; do not
  introduce React `asChild`. It also says generic child composition is not a
  default, so forwarding Bits `child` must be an intentional part-level
  decision rather than an indiscriminate migration.
- Native `Button` currently selects `<a>` or `<button>` from a truthy `href`
  while exposing one flattened `NativeProps` bag. Anchor-only and button-only
  attributes are therefore not discriminated.

## Commands

| Purpose | Command | Expected |
|---|---|---|
| Package declarations | `pnpm package:prepare` | exit 0 |
| Type consumer | `pnpm test:type-consumer` | exit 0 |
| Package checks | `pnpm --filter coss-svelte check && pnpm --filter coss-svelte test` | exit 0 |
| Full gate | `pnpm release:check` | exit 0 |

## Scope

**In scope**

- `packages/coss-svelte/src/components/*.svelte` that render a Bits UI primitive
- `packages/coss-svelte/src/internal/props.ts`
- `packages/coss-svelte/tests/type-consumer.ts`
- New focused type fixtures under `packages/coss-svelte/tests/types/`
- `Button.svelte` as the bounded native-polymorphism correction
- Registry artifacts regenerated from changed source

**Out of scope**

- Visual redesign
- Adding props that Bits UI 2.18.1 itself does not support
- React/Base UI compatibility aliases
- Experimental-component promotion
- A generic polymorphic/as-child framework
- Refactoring every native presentational component that has no demonstrated
  element-type defect

## Contract decisions

1. `ComponentProps<typeof Primitive.Part>` is the authoritative baseline for
   primitive-backed wrappers. The only exception is a documented upstream
   `any`: omit that property and redeclare the narrow contract justified by
   runtime/DOM evidence. Never publish `any` merely because the primitive does.
2. Every part receives one composition classification:
   - `owned-element`: the wrapper owns markup and omits primitive `child`;
   - `delegating-element`: trigger/action/link-like wrappers intentionally
     expose `child` and apply merged primitive props, required class, and
     `data-slot` to the delegated element;
   - `structural`: the wrapper owns its element and accepts only `children`.
3. Preserve `ref` and binding props whenever the selected classification can
   forward them correctly. Omitting a primitive prop requires a named,
   test-covered exception in the checked-in inventory.
4. Use discriminated unions at the public boundary. Do not recover correlation
   inside a component with `as` casts or widen callback parameters to make the
   template compile.
5. Native Button uses an `href` discriminant:
   - anchor branch: required `href: string`, anchor attributes, no button
     `type`; the empty string remains a valid HTML URL and still selects the
     anchor branch;
   - button branch: `href?: undefined`, button attributes and
     `type?: "button" | "submit" | "reset"`.
   Preserve current visual/loading behavior in both branches.
6. Narrow the installed primitive's known `any` declarations at the COSS
   boundary:
   - Checkbox Root and Checkbox Group: `name?: string`;
   - Switch Root: `value?: string`;
   - OTPField/PinInput Root: `onComplete?: (value: string) => void`.
   Keep these rows in the wrapper inventory with the installed Bits version and
   evidence so a dependency upgrade must revalidate—not silently remove or
   widen—the exceptions.

## Git workflow

- Suggested branch: `johann/001-bits-type-fidelity`
- Conventional commit: `fix(types): preserve Bits UI primitive contracts`
- Do not push or open a PR unless requested.

## Steps

### Step 1: Inventory wrappers by rendered primitive

Create `packages/coss-svelte/tests/types/primitive-wrapper-inventory.ts` (or a
plain data module imported by a Node test) with one row per primitive-backed
public wrapper:

```ts
{
  component: "DialogTrigger",
  primitive: "Dialog.Trigger",
  composition: "delegating-element",
  forwardsRef: true
}
```

The inventory must cover every public `.svelte` file that renders a Bits part,
including compound popup wrappers that render Portal/Overlay/Content. For each
row, identify the exact `ComponentProps<typeof Namespace.Part>` source type.
Do not infer the underlying HTML element manually. Add a repository test that
fails when a new `Primitive.*` wrapper is not classified.

**Verify**:
`rg -l 'Primitive\\.' packages/coss-svelte/src/components --glob '*.svelte' | wc -l`
records the reviewed inventory, and every matching file either derives
`ComponentProps` or contains an explicit, documented exception.

### Step 2: Migrate primitive parts from `NativeProps`

For each primitive-backed part, use its inventory classification. An
owned-element wrapper generally has this shape:

```ts
type PrimitiveProps = ComponentProps<typeof DialogPrimitive.Title>;
type Props = Omit<PrimitiveProps, "children" | "child"> & {
  children?: Snippet;
};
```

For a deliberately delegating wrapper, retain the primitive `child` type and
render it through the primitive so Bits can merge behavior. Prove that required
`data-slot` and visual classes reach the delegated element. Do not expose
`child` on structural wrappers merely because Bits has it.

Destructure `ref = $bindable(null)` when the primitive declaration exposes a
bindable ref and forward it with `bind:ref`. Keep wrapper-specific props as
intersections or explicit additions. If the wrapper supplies a default
`children` snippet, preserve the primitive’s actual snippet payload rather than
replacing it with a zero-argument snippet.

Keep `NativeProps` for actual native wrappers, but parameterize it with the
correct Svelte element attribute type where needed; do not use generic
`HTMLAttributes` for buttons, inputs, fieldsets, anchors, or images.

**Verify**:
`rg -l 'NativeProps' packages/coss-svelte/src/components --glob '*.svelte' | xargs rg -l 'Primitive\\.'`
returns no unexplained primitive wrappers.

### Step 3: Correct the native Button discriminant

Replace Button’s flattened `NativeProps` contract with explicit anchor and
button branches derived from `SvelteHTMLElements["a"]` and
`SvelteHTMLElements["button"]` (or the exact equivalent Svelte element
attribute types). Keep shared variant, size, loading, class, and children props
in a common intersection.

Runtime branching must use the same discriminant as the type. The decision is
fixed: `href=""` is a valid anchor value and must render `<a>`. Branch on
`href !== undefined` so URL handling is never governed by truthiness.

Add positive and negative type-consumer cases for `href`, `target`, `download`,
`type`, `form`, and `disabled`. Add a runtime assertion that loading prevents
button activation and gives the anchor `aria-disabled` without claiming native
anchor disabling.

**Verify**:
`pnpm test:type-consumer && pnpm --filter coss-svelte test` exits 0.

### Step 4: Restore discriminated root contracts

For Accordion, Calendar, Slider, Select, Combobox, Autocomplete, and ToggleGroup:

- derive the single and multiple branches from the corresponding Bits root;
- make `type`, `value`, and change/commit callbacks one discriminated union;
- preserve a Svelte-friendly default by allowing omitted `type` only on the
  single branch;
- retain convenience props (`items`, `options`, etc.) on both branches;
- preserve upstream props such as Slider `step: number | number[]`,
  `onValueCommit`, direction, orientation, form props, and open-complete
  callbacks;
- do not coerce an invalid caller combination at runtime merely to satisfy the
  primitive. Type it out of the API.
- implement each branch through normal discriminant narrowing or a
  branch-specific local props object checked with `satisfies`; do not add
  `as unknown as` or broad callback casts.

Add compile fixtures proving:

- valid omitted/single/multiple modes compile;
- single mode rejects array value/callbacks;
- multiple mode rejects scalar value/callbacks;
- Slider accepts the exact Bits scalar/array `step` combinations;
- bindings infer the correct value type in a `.svelte` consumer.

Annotate every intentionally invalid case with `@ts-expect-error` so a future
accidental widening fails the fixture. Then run `pnpm test:type-consumer`.

### Step 5: Fix concrete declaration defects

- Make Switch extend `ComponentProps<typeof SwitchPrimitive.Root>`, retaining
  its convenience `label` and fallback thumb. Omit the upstream `value` and
  redeclare it as `value?: string`.
- Narrow Checkbox/CheckboxGroup `name` to `string` while preserving every
  other primitive prop. Narrow OTPField `onComplete` to
  `(value: string) => void`; do not cast the callback at runtime.
- Type Pagination's child payload from the primitive root children parameters,
  not `unknown`.
- Review Progress and Meter in the same way, preserving their custom fallback
  rendering without erasing primitive snippet/ref types.

Add type fixtures that accept string Checkbox names/Switch values and a
single-string OTP completion callback, while rejecting objects, symbols,
numeric names/values, and incompatible callback parameters. Add a runtime OTP
case that fills exactly `maxlength` characters and observes one callback with
the completed string.

After packaging, inspect the generated declarations and assert representative
prop names in the type-consumer test.

**Verify**:

```sh
pnpm package:prepare
rg 'name\\?|required\\?|onCheckedChange\\?|ref\\?' packages/coss-svelte/dist/components/Switch.svelte.d.ts
rg 'currentPage|PageItem|range' packages/coss-svelte/dist/components/Pagination.svelte.d.ts
rg 'onComplete\\?: \\(value: string\\)' packages/coss-svelte/dist/components/OTPField.svelte.d.ts
```

All searches must find typed declarations. Also inspect Checkbox,
CheckboxGroup, Switch, and OTPField declarations and fail the type-consumer
suite if any of the three narrowed properties resolves to `any`.

### Step 6: Inspect declarations and regenerate derived artifacts

Run `pnpm package:prepare` first and inspect representative emitted declarations
for exact types, not only prop-name substrings. Then run repository generators
rather than hand-editing registry JSON. Update scope strategy text only if the
public strategy changed.

**Verify**:
`pnpm package:index:check && pnpm registry:check && pnpm scope:check`
all exit 0.

## Test plan

- Positive compile cases: primitive `ref`, `child`, native button attribute,
  Switch form props, Slider array step, single and multiple root modes, and
  Button anchor/button branches, including `href=""`.
- Negative compile cases: single mode with array value, multiple mode with
  scalar callback, invalid primitive-only prop on the wrong part, anchor prop
  on Button’s button branch, button prop on its anchor branch, and non-string
  Checkbox/Switch form values.
- Existing runtime tests continue to pass.

## Done criteria

- [ ] No primitive-backed wrapper uses generic `NativeProps` without a written exception.
- [ ] Every primitive wrapper has an owned/delegating/structural classification.
- [ ] Single/multiple roots expose discriminated public unions.
- [ ] Switch and Pagination declarations contain the missing typed contracts.
- [ ] Known upstream `any` props are narrowed and covered by upgrade-sensitive
      fixtures.
- [ ] Button’s anchor and button branches reject cross-element attributes.
- [ ] Registry and generated declarations are current.
- [ ] `pnpm release:check` exits 0.
- [ ] No unrelated dirty files were overwritten.

## STOP conditions

- Stop if a wrapper cannot preserve its required `data-slot`, classes, and Bits
  event/ref contract under the selected composition classification; write a
  focused exception instead of weakening the entire inventory.
- Stop if Svelte’s generated component declaration cannot retain a
  discriminated binding without unsafe casts; record a minimal compiler
  reproduction and keep the existing runtime until the public type design is
  resolved.
- Stop if Bits UI 2.18.1's declaration disagrees with the live runtime behavior.
- Stop if an in-scope file contains uncommitted user changes that cannot be
  preserved in a focused edit.

## Maintenance notes

Reviewers should compare generated `.d.ts` files with Bits UI 2.18.1, not merely
accept a passing `svelte-check`. When Bits UI is upgraded, rerun the type
consumer cases before broadening or narrowing any wrapper props.
