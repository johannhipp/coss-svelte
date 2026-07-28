# Plan 003: Close form, accessible-name, and locale contract gaps

> **Executor instructions**: Plan 001 must be complete. Implement only proven
> wrapper gaps; do not invent form serialization or a package-wide localization
> system where the installed primitive has neither. Update `plans/README.md`
> whenever this plan’s status changes.
>
> **Drift check (run first)**:
> `git diff --stat aced7142d97c241fb8cf62d613b72f819f883476..HEAD -- packages/coss-svelte/src/components packages/coss-svelte/src/internal packages/coss-svelte/tests apps/www/src/lib/examples docs`

## Status

- **Status**: TODO
- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**:
  `plans/001-restore-bits-ui-type-fidelity.md`
- **Category**: bug, accessibility, forms
- **Planned at**: commit
  `aced7142d97c241fb8cf62d613b72f819f883476`, 2026-07-28

## Goal

Make convenience labels name the actual control/group, make Field context reach
compound controls predictably, make Date Picker formatting follow its primitive
locale, and prove native/Bits-supported form serialization through observable
`FormData`.

## Proven current state

- RadioGroup renders its convenience `label` as an unassociated `<span>` inside
  the radiogroup.
- CheckboxGroup already uses the matching Bits GroupLabel and is the local
  precedent.
- DatePicker forwards `locale` inside `...rest`, but formats its trigger with a
  one-time `Intl.DateTimeFormat("en-US")`; the calendar and trigger can disagree.
- DatePicker also hardcodes English previous/next accessible labels.
- Select declares an `id` convenience prop but never destructures or applies it
  to its interactive Trigger.
- Field provides stable `controlId`, `labelId`, required, disabled, invalid, and
  a dynamic described-by list, but compound convenience controls do not follow
  one merge rule.
- Bits UI 2.18.1 supplies native hidden-input form behavior for Switch,
  Checkbox/CheckboxGroup, RadioGroup, and Select/Combobox roots through their
  `name` props.
- Bits DatePicker and PinInput roots do not expose `name`; this plan must not
  fabricate hidden fields for DatePicker or OTPField.

## Scope

**In scope**

- RadioGroup accessible naming
- Field-context wiring for Checkbox, Switch, RadioGroup, Select, Combobox,
  Autocomplete, and DatePicker convenience controls
- DatePicker locale-driven formatting and customizable navigation labels
- FormData tests for Input, Textarea, Switch, Checkbox, CheckboxGroup,
  RadioGroup, single Select, single Combobox, and single Autocomplete
- Focused examples, public docs prose, declarations, and registry regeneration

**Out of scope**

- A translation provider, message catalog, date/time-zone conversion API, or
  form-library adapter
- New `name` behavior for DatePicker, Calendar, OTPField, or PinInput
- Redesigning Bits UI’s hidden-input representation
- General validation beyond forwarding native/Bits required/disabled state
- Number Field; its custom form contract is specified in plan 008

## Shared Field merge contract

Compound convenience controls must use one precedence rule:

| Concern | Resolution |
|---|---|
| control ID | explicit component/trigger `id` → enclosing Field `controlId` → component-generated ID |
| disabled/required/invalid | explicit component value when provided → enclosing Field value → primitive default |
| description | deduplicated union of caller `aria-describedby` and Field’s dynamic `describedBy` IDs |
| accessible name | caller `aria-labelledby` → caller `aria-label` → native Field label association → component convenience label |

Do not apply root-only IDs to state containers that do not render the
interactive element. In compound mode, the public part (`SelectTrigger`,
`ComboboxInput`, and similar) remains the place for an explicit ID; root
convenience props apply only to the generated control.

If the same merge code is needed by three or more controls, add a small typed
internal helper that works with strings/booleans only. Do not create a general
form framework or return untyped attribute bags.

## Implementation

### Step 1: Give RadioGroup a real accessible name

Add a stable convenience-label ID. When `label` is non-empty and the caller has
provided neither `aria-labelledby` nor `aria-label`:

- put the ID on the visual label;
- set the RadioGroup root’s `aria-labelledby` to that ID.

If the caller supplies either accessible-name attribute, preserve it and do not
let the convenience label override it. The label may remain a styled span
because RadioGroup is a composite widget; the explicit ARIA relationship is the
contract.

Add Testing Library cases that query:

- the options-mode group by its convenience name;
- the compound-children group by its convenience name;
- a group with caller `aria-label`;
- a group with caller `aria-labelledby`.

**Verify**:

```sh
pnpm --filter coss-svelte exec vitest run radio-group
```

### Step 2: Wire Field context to actual interactive elements

Audit the listed controls against the shared merge table. At minimum:

- Select’s convenience `id` reaches SelectPrimitive.Trigger.
- Combobox and Autocomplete convenience input IDs reach the actual input.
- DatePicker convenience ID reaches DatePickerPrimitive.Trigger.
- Checkbox and Switch resolve their Root ID from Field before generating one.
- RadioGroup receives Field naming/description/state at its root.

For each control:

1. retain caller-provided ARIA and primitive callbacks;
2. place `id`, `disabled`, `required`, `aria-invalid`, and
   `aria-describedby` on the element/primitive that owns the semantic;
3. do not duplicate one ID in root and trigger/input DOM;
4. do not render a second convenience label when an enclosing Field label is
   already authoritative unless the caller explicitly supplied the component
   label;
5. keep compound mode explicit: a consumer composing parts applies IDs to the
   relevant part unless the root already owns that semantic in Bits.

Create deterministic fixtures using Field label, description, error,
required, disabled, and invalid states. Assert actual DOM IDs and accessible
queries, not source strings.

Because `<button>` is labelable, Field’s `<label for>` may target Select or
DatePicker Trigger. Verify this in Chromium as well as jsdom rather than
assuming every accessibility implementation computes the same name.

**Verify**:

```sh
pnpm --filter coss-svelte exec vitest run field compound
pnpm --filter coss-svelte check
```

### Step 3: Make DatePicker use one locale contract

Make `locale` explicit with a deterministic `"en-US"` default and pass the same
value to DatePickerPrimitive.Root. Derive the trigger formatter whenever locale
changes:

```ts
new Intl.DateTimeFormat(locale, {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric"
})
```

Use the concrete Bits `DateValue` capability (prefer its `toDate("UTC")`
method) instead of widening the public value to `unknown` or converting the
public API to JavaScript `Date`.

Retain `label` as the empty-value text and add narrow, explicit props:

```ts
previousMonthLabel?: string; // "Previous month"
nextMonthLabel?: string;     // "Next month"
```

Forward those values to the actual PrevButton/NextButton accessible names.
Do not pretend `Intl` translates interface messages.

Tests must cover:

- `en-US` and `de-DE` display for one deterministic CalendarDate;
- a runtime locale prop change;
- the same locale reaching the calendar primitive;
- custom previous/next labels;
- no timezone-dependent host snapshot;
- SSR and hydration with the explicit default locale.

Compare trigger text with an `Intl.DateTimeFormat` created using the same test
configuration rather than hardcoding punctuation.

**Verify**:

```sh
pnpm --filter coss-svelte exec vitest run date-picker
pnpm --filter coss-svelte test:ssr
```

### Step 4: Prove only supported form serialization

Add `packages/coss-svelte/tests/FormContractsFixture.svelte` and
`packages/coss-svelte/tests/form-contracts.test.ts`. Construct
`new FormData(form)` and assert the public outcome for:

| Family | Cases |
|---|---|
| native Input/Textarea | name/value, disabled omission, empty value |
| Switch | checked value, unchecked behavior, disabled omission, required validity where jsdom supports it |
| Checkbox | checked value, unchecked omission, custom value, disabled omission |
| CheckboxGroup | multiple checked values under one name, disabled/required behavior |
| RadioGroup | selected value, empty required group, disabled option/group |
| Select | single selected value, empty, required, disabled, autocomplete passthrough |
| Combobox/Autocomplete | single selected value and disabled omission |

Assert behavior, not hidden-input tag names or DOM placement. If jsdom cannot
model a primitive’s selection/validity behavior reliably, add only that case to
the existing docs browser suite in this plan and retain a narrow DOM test here.
Plan 004 may later register or move the evidence into its guarded family
fixture; this plan's completion must not depend on its own downstream plan.

Add explicit type-consumer cases for each supported `name`, `required`,
`disabled`, and value binding. Add negative type cases proving DatePicker and
OTPField do not advertise a `name` prop.

Do not assert array serialization until the installed Bits primitive’s
observable output has been measured and documented; single-value coverage is
the release requirement for this plan.

**Verify**:

```sh
pnpm --filter coss-svelte exec vitest run form-contracts
pnpm test:type-consumer
```

### Step 5: Reconcile docs, examples, and generated output

- Add one form example that submits or displays actual serialized values.
- Document the shared Field merge precedence and the compound-part recipe.
- Document DatePicker’s locale and custom navigation-label props.
- State explicitly that DatePicker and OTPField do not serialize by name.
- Leave API-table generation to plan 005; add its curated contract inputs only
  if plan 005 has already created them.
- Run package index, scope, and registry generators rather than editing
  generated artifacts by hand.

**Verify**:

```sh
pnpm package:index:check
pnpm scope:check
pnpm registry:check
pnpm examples:check
```

### Step 6: Publish-facing verification

Run:

```sh
pnpm release:check
```

Record which form cases run in jsdom and which run in Chromium.

## Acceptance criteria

- [ ] RadioGroup convenience labels create the group’s accessible name.
- [ ] Caller `aria-label`/`aria-labelledby` remains authoritative.
- [ ] Field IDs and state reach the actual interactive element for every listed
      convenience control.
- [ ] Caller and Field description IDs are merged without duplicates.
- [ ] DatePicker trigger and calendar use one explicit locale.
- [ ] DatePicker navigation labels are customizable without a global i18n API.
- [ ] Every listed Bits/native form control has observable FormData coverage.
- [ ] DatePicker and OTPField do not claim unsupported named serialization.
- [ ] Type consumer, SSR, generated artifacts, and `pnpm release:check` pass.

## STOP conditions

- Stop if Field association requires patching Bits UI internals; document the
  explicit compound-part recipe and file an upstream reproduction instead.
- Stop if jsdom disagrees with a real Chromium result; retain the Chromium
  behavior and move the test rather than adding source-shape assertions.
- Stop if localized DateValue formatting would require changing the public
  value type or introducing a time-zone policy.
- Stop if a form assertion depends on a private hidden-input structure instead
  of FormData/validity behavior.
- Stop if an in-scope file has user changes that cannot be preserved.

## Maintenance notes

Re-run the form matrix when Bits UI changes its form-control implementation.
Localized tests should compare meaning and the same Intl configuration, not
snapshot browser punctuation. Any new convenience control must document where
its ID, name, and Field semantics land in the DOM.
