# Plan 008: Implement Number Field as a specified Svelte primitive

> **Executor instructions**: Reconcile the existing uncommitted component,
> helper, example, test, metadata, theme, and generated-output spike before
> changing it. Do not treat green focused tests as approval of its public
> contract.
> Plans 001, 003, 005, and 007 must be complete. Update `plans/README.md`
> whenever this plan's status changes.
>
> **Drift check (run first)**:
> `git diff --stat aced7142d97c241fb8cf62d613b72f819f883476..HEAD -- packages/coss-svelte apps/www docs tests`
>
> Then inspect:
> `git status --short -- packages/coss-svelte apps/www/src/lib/examples/number-field.svelte apps/www/src/lib/docs/api-reference.js packages/theme apps/registry docs tests`

## Status

- **Status**: IN PROGRESS — a full six-part spike exists but requires contract
  reconciliation and missing evidence
- **Priority**: P1
- **Effort**: XL
- **Risk**: HIGH
- **Depends on**:
  `plans/001-restore-bits-ui-type-fidelity.md`,
  `plans/003-form-accessibility-locale-contracts.md`,
  `plans/005-truthful-api-docs-and-dev-loop.md`,
  `plans/007-preview-and-code-infrastructure.md`
- **Category**: feature, accessibility, forms, API
- **Planned at**: commit
  `aced7142d97c241fb8cf62d613b72f819f883476`, 2026-07-28

## Goal

Replace the deferred Number Field placeholder with a stable, form-capable
Svelte compound component whose parsing, stepping, commit, accessibility, and
pointer behavior are explicit and tested.

The public family is:

- `NumberField`
- `NumberFieldDecrement`
- `NumberFieldGroup`
- `NumberFieldIncrement`
- `NumberFieldInput`
- `NumberFieldScrubArea`

Use native Svelte markup and a private typed context. The installed
`bits-ui@2.18.1` has no Number Field primitive, so a custom implementation is
justified. Do not copy Base UI's React source or claim complete Base UI
compatibility.

## Proven Current State

- The canonical COSS surface has one root, five parts, and 11 particles.
- The upstream COSS `ScrubArea` associates a visible label with the input. The
  local Svelte API must retain that semantic relationship.
- The dirty worktree now promotes Number Field to stable and contains all six
  components, private numeric/context helpers, theme rules, an example,
  runtime/helper/SSR tests, type-consumer cases, package index/registry output,
  and revised implementation prose.
- The current helper explores finite config validation, decimal-safe step math,
  locale digits/separators, partial-edit parsing, focused/blurred formatting,
  and invariant serialization. The current runtime tests exercise fallback/
  Field anatomy, typing, step keys, click/hold, wheel, scrub, FormData/reset,
  and SSR.
- A passing spike test is not yet the specified state machine. Current source
  diverges from the contract below in material ways:
  - public size is `"sm" | "md" | "lg"` instead of canonical
    `"sm" | "default" | "lg"`;
  - callbacks expose only a reason string and commit even when a semantic value
    did not change;
  - external values are reactively clamped and text commits are snapped to the
    step grid;
  - the reset listener reads the latest `defaultValue` rather than a captured
    initial baseline;
  - Enter prevents native form submission;
  - validation covers parse failure but not the complete required/bounds/Field
    contract;
  - ScrubArea accepts arbitrary children instead of requiring its accessible
    `label`, and temporarily mutates global document styles;
  - pointer cancel can leave click-suppression/commit state ambiguous.
- No current evidence yet proves the complete callback order, external binding
  behavior, locale/format changes, all terminal cleanup paths, external-form
  association, compound ScrubArea contract, declaration fidelity, guarded
  browser behavior, or clean registry consumption.
- WAI-ARIA spinbutton guidance requires a keyboard-operable numeric value with
  `aria-valuenow` and applicable bounds. Native form behavior still has to work
  when the visible editable control uses `type="text"` for locale-aware input.

## Scope

**In scope**

- The six canonical exports above
- Nullable numeric state and Svelte `bind:value`
- Locale-aware text editing and `Intl.NumberFormat` display
- Min/max validation and decimal-safe stepping
- Keyboard, step-button, press-and-hold, optional wheel, and scrub input
- Native form association, serialization, reset, disabled, readonly, required,
  and invalid states
- Field label/description/error integration from plan 003
- Package, declarations, metadata, generated registry, docs, one canonical
  example, and focused interaction tests

**Out of scope**

- Reproducing all private Base UI hooks or React controlled/uncontrolled rules
- Arbitrary expression parsing, units in the edit buffer, scientific notation,
  or BigInt/decimal-library precision
- Multiple values, ranges, sliders, or calculator behavior
- Every one of the 11 upstream particles as a local example
- Locale-specific grammatical labels beyond consumer-provided text
- A new runtime dependency

## Public Contract

### Root props

The root renders an owned `<div>`. Derive its non-conflicting surface from
`HTMLAttributes<HTMLDivElement>`, omit `children` and the public `id` conflict,
and add a bindable `ref?: HTMLDivElement | null`. The public `id` names the
spinbutton input/label association, not the container. Add the following owned
props:

```ts
type NumberFieldReason =
	| "input"
	| "increment"
	| "decrement"
	| "keyboard"
	| "wheel"
	| "scrub"
	| "reset";

type NumberFieldChangeDetails = Readonly<{
	reason: NumberFieldReason;
	previousValue: number | null;
	sourceEvent: Event | null;
}>;

type NumberFieldProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	"children" | "id"
> & {
	ref?: HTMLDivElement | null;
	value?: number | null;
	defaultValue?: number | null;
	min?: number;
	max?: number;
	step?: number;
	smallStep?: number;
	largeStep?: number;
	locale?: string | string[];
	format?: Intl.NumberFormatOptions;
	label?: string;
	size?: "sm" | "default" | "lg";
	id?: string;
	name?: string;
	form?: string;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	invalid?: boolean;
	allowWheelScrub?: boolean;
	onValueChange?: (
		value: number | null,
		details: NumberFieldChangeDetails
	) => void;
	onValueCommit?: (
		value: number | null,
		details: NumberFieldChangeDetails
	) => void;
	class?: string;
	children?: Snippet;
};
```

Defaults:

- `defaultValue = null`
- `step = 1`
- `smallStep = 0.1`
- `largeStep = 10`
- `locale = "en-US"`
- `size = "default"`
- `required = disabled = readonly = invalid = allowWheelScrub = false`

`value` is bindable. Follow Svelte semantics:

- `defaultValue` supplies the initial value and the form-reset baseline only;
- changes to `defaultValue` after mount do not rewrite current state;
- an external `value` change updates the displayed value without invoking
  `onValueChange` or `onValueCommit`;
- internal accepted changes assign `value`, so `bind:value` updates normally;
- there is no React-style runtime test for whether a prop is "controlled."

`onValueCommit` is an intentional Svelte-package name aligned with the existing
Bits-backed Slider contract; do not add Base UI's React
`onValueCommitted` as an alias. Callback details are precise:

- for `onValueChange`, `previousValue` is the semantic value immediately before
  that mutation;
- for `onValueCommit`, `previousValue` is the value at the start of the
  interaction transaction (focus session, button press, scrub, wheel/key
  operation, or reset);
- `sourceEvent` is the event that caused the mutation; timer-driven button
  repeats retain the initiating pointer event, while the final commit receives
  the terminal pointer event;
- external binding writes produce neither callback and therefore need no
  synthetic event.

Reject `NaN`, infinities, non-positive steps, and `min > max` with descriptive
root-boundary errors. Do not silently mutate an externally supplied finite
value merely because it is out of bounds: expose it as invalid, and clamp it on
the next value-committing user operation. This avoids an effect that writes
back into a parent binding and keeps native-like edit validity.

The root uses `children-first-fallback` composition from plan 002:

- supplied children are the entire part hierarchy;
- with no children, generate ScrubArea/Group/Input/step-button convenience
  markup;
- if an enclosing Field provides a label and `label` is absent, omit the
  convenience ScrubArea entirely rather than rendering a second or empty label;
  compound consumers may add an explicit ScrubArea when scrubbing is desired;
- otherwise render `label`, defaulting to `"Number"` outside Field.

### Part props

`NumberFieldGroup` is a presentational `<div>` that forwards supported div
attributes, `ref`, `class`, and children. It owns the grouped focus/invalid/
disabled styling, not value state.

`NumberFieldInput` renders the only editable control:

- native `<input type="text" inputmode="decimal">`;
- `role="spinbutton"`;
- root-owned `id`, displayed value, disabled/readonly/required/form state,
  keyboard/input/focus/wheel handlers, ARIA value/bounds, and validation;
- no public `type`, `value`, `defaultValue`, `name`, `min`, `max`, `step`, or
  duplicate behavior-handler override;
- forwarded safe text-input attributes, `ref`, `class`, and composed focus,
  blur, and key handlers where plan 001 permits them.

`NumberFieldIncrement` and `NumberFieldDecrement` are native
`<button type="button">` parts:

- default accessible labels `"Increase value"` and `"Decrease value"`;
- default decorative icons when children are absent;
- custom children replace only icon content;
- root owns `type`, step direction, disabled-at-bound state, and repeat
  handlers;
- callers may provide a more specific `aria-label`.

`NumberFieldScrubArea` is a real label association, not decorative text:

- require a non-empty, non-whitespace `label: string` in compound usage and
  fail descriptively otherwise;
- render a wrapper containing `<label for={inputId}>`;
- allow an optional child snippet to replace the visible label contents while
  `label` remains the accessible fallback: when custom children render, mark
  their visual wrapper `aria-hidden="true"` and include the `label` in a
  visually hidden span inside the real `<label>`;
- expose wrapper class/ref attributes that do not conflict with pointer
  ownership;
- support horizontal scrubbing only on eligible fine pointers;
- fail descriptively if rendered outside `NumberField`.

All five parts fail descriptively outside the root. Context lookup must not
fall back to a global singleton.

## Numeric and Editing State Machine

Keep three distinct values:

1. **bound value**: `number | null`, the semantic value exposed to consumers;
2. **edit buffer**: the exact focused text, including partial valid syntax;
3. **display string**: the formatted blurred representation derived from the
   bound value.

Do not make the input's text both the parse buffer and canonical numeric state.

### Transitions

| Input | Buffer result | Bound value | Callback | Commit |
|---|---|---|---|---|
| Focus | ungrouped localized raw value | unchanged | none | no |
| Valid number | preserve typed text | parsed finite number | `input` change if different | no |
| Trailing decimal, e.g. `2,` | preserve typed text | parsed `2` if different | `input` change | no |
| Empty | preserve empty text | `null` if different | `input` change | no |
| Sign/decimal prefix | preserve text | unchanged | none | no |
| Invalid text | preserve text | unchanged | none | no |
| Blur | format accepted value; clamp bounds | normalized value | change if normalization differs | one `input` commit if the focus session changed value |
| Enter | same normalization as blur | normalized value | change if needed | one `input` commit, then allow native form submission |
| Escape | discard partial/invalid text | accepted value unchanged | none | no |
| Step key | replace buffer from next value | decimal-safe next value | `keyboard` change | immediate |
| Step button hold | replace buffer on each repeat | decimal-safe next values | directional change per step | once on release/cancel |
| Wheel notch | replace buffer from next value | decimal-safe next value | `wheel` change | immediate |
| Scrub gesture | replace buffer on each threshold | decimal-safe next values | `scrub` change per step | once on release/cancel |
| Form reset | discard buffer | initial default baseline | `reset` change if different | once if changed |
| External binding write | replace buffer unless actively preserving an equivalent edit | supplied finite/null value | none | no |

Rules:

- Group separators are accepted and ignored while parsing. Locale digits,
  decimal separator, plus sign, minus sign, non-breaking spaces, and bidi
  marks are normalized.
- Scientific notation, currency symbols, percent signs, and unit strings are
  invalid edit syntax.
- A partial or invalid buffer sets the visible input's validity/`aria-invalid`
  without erasing the user's text.
- Parseable out-of-range text may update the bound value temporarily; bounds
  are enforced on blur, Enter, or any step operation.
- Direct text entry is not snapped to the step grid. `step` controls the
  discrete interactions and browser-style step mismatch is not invented.
- Step grids use `min` as their base when present, otherwise zero.
- If the current value is off-grid, increment chooses the next higher grid
  value and decrement the next lower grid value.
- From `null`, stepping uses zero as the starting point and clamps the result to
  the nearest applicable bound.
- Decimal math rounds to a bounded precision and must not expose artifacts such
  as `0.30000000000000004`.
- If an interaction produces the same clamped value, emit neither change nor
  commit.
- `onValueCommit` reports a semantic value change, not every blur event.

The helper spike's functions and constants may be retained only where their
tests agree with this table. Rename or remove helpers whose names imply a
different public behavior. In particular, a clamp helper must not be wired to
an effect that rewrites every external value.

## Locale and Formatting Contract

- Focused text is an ungrouped localized decimal representation of the raw
  numeric value.
- Blurred text uses `Intl.NumberFormat(locale, format)`.
- Default formatting must preserve useful configured precision rather than
  inheriting `Intl`'s three-fraction-digit default blindly. Derive a bounded
  default `maximumFractionDigits` from the configured steps, up to the helper's
  documented maximum, unless the consumer supplies one.
- Consumer `format.maximumFractionDigits` may visually round the blurred value;
  refocusing reveals the unrounded canonical value.
- Currency, unit, and percent decorations appear only in the blurred display.
  For example, a canonical percent value of `0.12` displays as `12%` and edits
  as `0.12`.
- Validate the `Intl.NumberFormat` options at the root boundary and rethrow a
  component-specific error. Currency style without `currency`, invalid locale
  tags, and unsupported options must not fail later inside an input event.
- Form serialization is locale-independent `String(value)`, or an empty string
  for `null`.

Changing `locale` or `format` updates blurred display. While focused, a locale
change reparses the existing buffer with the old locale before converting it
to the new focused representation; if the buffer is invalid, defer conversion
until blur rather than destroying user text.

## Accessibility and Form Contract

### Spinbutton semantics

The visible input must expose:

- its accessible name from, in priority order, explicit input ARIA naming,
  `NumberFieldScrubArea`, enclosing Field label, then root fallback label;
- `role="spinbutton"`;
- `aria-valuenow` when the accepted value is numeric;
- `aria-valuemin`/`aria-valuemax` only when configured;
- `aria-valuetext` when blurred formatting conveys more than the raw number;
- merged `aria-describedby` from caller, Field description, and Field error;
- `aria-invalid` when the caller/Field marks invalid, the edit is invalid, or
  the accepted value violates configured bounds;
- `aria-required`, `aria-readonly`, and `aria-disabled` as applicable.

Use plan 003's ID/state merge table. Do not invent a second Field context or
overwrite caller-provided description IDs.

### Native form behavior

Locale-aware editing requires a text input, while submitted data must be an
invariant number. Use:

- the visible text input without `name`, so it owns focus, required/custom
  validity, and user interaction;
- one hidden input with root `name`, `form`, `disabled`, and invariant value;
- no hidden input when `name` is absent.

The visible and hidden controls must associate to the same external form when
`form` is supplied. Resolve the actual form from the input, subscribe to its
`reset` event once, and clean up when the form/ref changes or the root unmounts.

Validation:

- `required && value === null` is invalid unless readonly/disabled native rules
  exempt the control;
- partial/invalid text uses `setCustomValidity`;
- finite values outside min/max use `setCustomValidity`;
- consumer `invalid`/Field invalid affects ARIA/styling but does not invent an
  unknown validation message;
- `disabled` removes the hidden entry from `FormData`;
- a named null value serializes as the native empty entry (`name=""`).

A form must produce exactly one entry for Number Field. Reset restores the
initial `defaultValue` baseline, not the most recent `defaultValue` prop.

## Interaction Contract

### Keyboard

When the input is editable:

- ArrowUp/ArrowDown: `step`
- Shift+ArrowUp/ArrowDown: `largeStep`
- Alt+ArrowUp/ArrowDown: `smallStep`
- if both modifiers are present, Shift takes precedence
- PageUp/PageDown: `largeStep`
- Home: `min`, only when `min` exists
- End: `max`, only when `max` exists
- Enter: normalize/commit the edit before normal form behavior
- Escape: discard the current buffer only when it differs from the accepted
  representation

Prevent default for handled stepping/Home/End keys. Do not block Tab or normal
text-editing shortcuts. Compose consumer key handlers first; if the consumer
prevents default, skip owned behavior.

### Increment/decrement buttons

- Pointer down performs one immediate step and retains input focus.
- After 400ms, repeat every 80ms while the same primary pointer remains active.
- Track the pointer and use capture where available.
- Finish with one commit on pointerup, pointercancel, lost capture, window blur,
  or unmount.
- Suppress the synthetic click that follows an owned pointer sequence so it
  does not double-step.
- Preserve keyboard/assistive button clicks (`MouseEvent.detail === 0`) as one
  change and one commit.
- Clear every timer/listener on all terminal paths.

At a bound, the corresponding button is natively disabled. Both buttons are
disabled when the root is disabled or readonly.

### Wheel

Wheel stepping is opt-in through `allowWheelScrub` and runs only while the input
itself is focused. Map vertical wheel direction to one normal step. Call
`preventDefault()` only when a step was actually handled; use a non-passive
listener if the framework event binding cannot guarantee that. Unfocused
wheel events must keep normal page scrolling.

### Scrub area

- Start only for a primary fine pointer on the ScrubArea; do not hijack touch
  page scrolling.
- Capture the pointer and measure horizontal delta.
- One configured threshold (default 8 CSS pixels) equals one normal step;
  retain fractional remainder so slow movement is not lost.
- Changing direction consumes the accumulated remainder correctly.
- Emit changes during the drag and one commit on release/cancel if the value
  changed.
- Keep the input focused and its text synchronized.
- Use local classes/data attributes for active cursor/selection suppression.
  Do not write permanent global listeners, global cursor styles, or
  `document.body` state.
- Clean up capture, listeners, and active styling on cancellation, blur, and
  unmount.

Scrubbing is direct manipulation, not an animation; reduced-motion settings do
not disable the value change.

## Implementation Sequence

### Step 0: Reconcile the full live spike

1. Record all dirty Number Field components, private helpers, tests, metadata,
   API, theme, example, package index, registry, scope, and decision files.
2. Compare the helper behavior with the state table above.
3. Retain proven finite validation, decimal math, locale parsing, formatting,
   and serialization helpers.
4. Reconcile the full component spike against every divergence listed in
   **Proven Current State**; do not preserve a behavior merely because a
   focused test currently asserts it.
5. Adjust helper names/tests where the spike clamps or aligns more broadly than
   this plan permits.
6. Move hand-authored Number Field API prose into plan 005's curated contract
   source; do not expand the legacy `api-reference.js` table as a second truth.
7. Keep metadata stable only when the component family and release gates are
   ready to land together.

**Verify**:

```sh
pnpm --filter coss-svelte exec vitest run number-field-helpers
```

### Step 1: Implement the typed root state and parts

Add a private context module with:

- closed state/config types;
- input ID/ref registration;
- Field-derived IDs/state;
- value/edit/display derivation;
- `change`, `commit`, `step`, `beginEdit`, `commitEdit`, and `cancelEdit`
  operations;
- form reset registration;
- no `any`, string-keyed global context, or browser global at module scope.

Implement Root first, then Input/Group, then buttons, then ScrubArea. Keep
owned handlers internal and expose only deliberate composition seams.

**Verify**:

```sh
pnpm --filter coss-svelte check
pnpm --filter coss-svelte exec vitest run number-field
pnpm --filter coss-svelte test:ssr
```

### Step 2: Implement form and Field integration

Wire the visible/hidden control pair, external form association, validity, form
reset, and plan 003's Field merge contract. Test nested and externally
associated forms with `FormData`, not source inspection.

**Verify**:

```sh
pnpm --filter coss-svelte exec vitest run number-field-form form-contracts
```

### Step 3: Add pointer interactions

Add press-and-hold, wheel, and scrub behavior only after input/keyboard/form
tests pass. Use fake timers for deterministic repeat-unit tests and real pointer
events for browser proof. Centralize terminal cleanup so each path is covered
once.

**Verify**:

```sh
pnpm --filter coss-svelte exec vitest run number-field-pointer
pnpm test:browser
```

### Step 4: Publish the contract and docs

Add the canonical example and curated API entries. Update the scope decision:
Number Field moves from deferred to stable because its formerly missing
interaction/accessibility specification now exists and is covered. Do not
claim all 11 particles were ported.

The example should demonstrate:

- a quantity value with realistic min/max;
- visible scrub label;
- attached decrement/input/increment group;
- decimal step;
- a small submitted-value readout or binding feedback;
- only public `"coss-svelte"` imports.

Use plan 007's raw source pipeline so Code displays this exact file.

### Step 5: Generate and verify package/registry output

Run generators only after source metadata and retained dirty work are
reconciled:

```sh
pnpm package:index
pnpm scope:build
pnpm registry:build
```

Inspect `number-field.json`: it must include all six public components, private
context/numeric helpers through source closure, the theme dependency, and no
React/Base UI dependency or docs-only alias.

## Files

### Add

- `packages/coss-svelte/src/internal/number-field-context.svelte.ts`
- `packages/coss-svelte/src/internal/NumberFieldStepButton.svelte`
- `packages/coss-svelte/src/components/NumberField.svelte`
- `packages/coss-svelte/src/components/NumberFieldDecrement.svelte`
- `packages/coss-svelte/src/components/NumberFieldGroup.svelte`
- `packages/coss-svelte/src/components/NumberFieldIncrement.svelte`
- `packages/coss-svelte/src/components/NumberFieldInput.svelte`
- `packages/coss-svelte/src/components/NumberFieldScrubArea.svelte`
- focused package fixtures/tests for state, form, pointer, SSR, and cleanup
- `apps/www/src/lib/examples/number-field.svelte`

### Reconcile existing uncommitted files

- `packages/coss-svelte/src/internal/number-field.ts`
- `packages/coss-svelte/tests/number-field-helpers.test.ts`
- `packages/coss-svelte/src/metadata.js`
- plan 005's curated API contract source and generated docs data

### Modify

- `packages/coss-svelte/tests/type-consumer.ts`
- `packages/theme/src/components.css`
- `docs/scope/source/00-component-index.md`
- `docs/scope/source/01-source-audit.md`
- `docs/scope/source/11-selection-and-input.md`
- `docs/scope/source/90-particle-coverage.md`
- `docs/scope/source/README.md`
- `docs/implementation/decision-records.md`
- `docs/implementation/v0.1-scope-decisions.md`
- `docs/implementation/unimplemented-components.md`
- `docs/implementation/post-v0.1-parity-backlog.md`

### Generate

- `packages/coss-svelte/src/index.js`
- generated declarations
- `docs/scope/README.md`
- `docs/scope/component-implementation-matrix.md`
- `docs/scope/component-implementation-outline.md`
- `apps/registry/static/r/number-field.json`
- `apps/registry/static/r/index.json`
- plan 005's generated API output

Do not add another Vite/Vitest configuration file unless the existing package
test environment demonstrably cannot run a required fixture.

## Test Matrix

### Pure helper tests

- invalid config and non-finite values
- decimal, negative, min-based, off-grid, and bounded steps
- null starting values
- localized Latin/non-Latin digits and separators
- empty/sign/trailing-decimal/invalid buffers
- focused/blurred currency, unit, and percent formatting
- invariant serialization and precision bounds

### Runtime component tests

- fallback and compound anatomy
- bindable value plus callback order/details
- no callbacks for external writes
- partial edit preservation and Escape
- blur/Enter normalization
- every keyboard mapping and disabled/readonly path
- press immediate/repeat/release/cancel/lost-capture cleanup
- keyboard button click without pointer double-step
- focused opt-in wheel behavior
- scrub threshold, remainder, direction change, and cleanup
- step-button bound state
- locale/format changes while focused and blurred

### Form and accessibility tests

- one invariant `FormData` entry
- named null, disabled, readonly, required, and external form association
- initial-default reset and callback order
- unique IDs across multiple SSR/rendered roots
- ScrubArea label click focuses the input
- enclosing Field label/description/error merge
- explicit caller ARIA naming/description preservation
- role/value/min/max/value-text/invalid attributes
- no duplicate visible label in convenience mode inside Field

### Type and declaration tests

- accepts `bind:value`, nullable defaults, locale arrays, format options, and
  all six parts
- preserves native refs/attributes on actual part elements
- rejects invalid size/reason assumptions, non-owned input props, and parts
  used with incompatible snippets
- public declarations contain the closed callbacks and no `any`

### Browser tests

Add these cases to the real docs example/browser suite in this plan so its
completion does not depend on the later plan 004. Plan 004 may move or register
the deep cases in its guarded family fixture without changing their contract:

- type a partial localized decimal and retain it across an animation frame;
- commit and verify formatted display/binding;
- step at bounds with keyboard and buttons;
- hold a button and prove repeat stops on release/cancel;
- verify wheel is ignored unfocused and handled focused only when enabled;
- scrub with a real mouse pointer and verify one release commit;
- submit and reset a native form;
- run axe in default, invalid, disabled, and Field-labelled states;
- verify a 390x844 viewport has no document-level horizontal overflow.

Avoid pixel screenshots as behavioral assertions. Use ignored parity evidence
only to review group density, hit targets, focus ring, invalid styling, and
light/dark presentation.

## Verification

Focused:

```sh
pnpm --filter coss-svelte exec vitest run number-field
pnpm --filter coss-svelte check
pnpm --filter coss-svelte test:ssr
pnpm test:type-consumer
node --test tests/api-reference.test.mjs tests/example-contract.test.mjs tests/registry-metadata.test.mjs tests/registry-closure.test.mjs
```

Generated and docs:

```sh
pnpm package:index:check
pnpm scope:check
pnpm registry:check
pnpm theme:check
pnpm examples:check
pnpm docs:smoke
pnpm test:browser
```

Final publish-facing gate:

```sh
pnpm install --frozen-lockfile
pnpm biome:ci
pnpm check
pnpm release:check
```

## Acceptance Criteria

- All six canonical exports have generated, `any`-free declarations.
- The state transition table is enforced by tests rather than implicit event
  order.
- Locale text editing preserves partial input and formats only at the defined
  commit boundaries.
- Decimal stepping, bounds, callback reasons, repeat, wheel, and scrub behavior
  are deterministic and cleaned up on every terminal path.
- A named field contributes exactly one invariant form value and resets to its
  initial default.
- Spinbutton/Field semantics pass focused DOM assertions and axe.
- Convenience and compound composition both work without duplicated labels.
- Metadata, scope, API, example, registry, docs routes, and package exports agree.
- Number Field is removed from deferred prose without claiming full particle or
  Base UI parity.
- The registry item's source closure passes focused checks and is ready for
  plan 010's final packed clean-consumer gate; this plan does not depend on
  that downstream integration plan.

## Stop Conditions

Stop and revise the contract rather than adding patches if:

- Svelte binding semantics require a React-like controlled/uncontrolled mode;
- locale parsing cannot preserve partial text independently of numeric state;
- the visible and serialized inputs create duplicate or invalid FormData;
- press, scrub, or form listeners survive cancellation/unmount;
- Field integration needs a second competing context instead of plan 003's
  contract;
- a new numeric/gesture dependency appears necessary;
- implementation expands into scientific notation, arbitrary expressions, or
  full Base UI parity;
- generation would overwrite unreconciled user changes.
