# Plan 005: Complete Field semantics with runtime component tests

> **Executor instructions**: Follow this plan step by step. Preserve the
> native-first boundary in ADR-003: Field owns accessible association and
> presentation, but it does not become a validation framework. Start with a
> failing runtime contract, make explicit consumer props win over inherited
> defaults, and run every verification gate below. Update this plan's row in
> `plans/README.md` when done.
>
> **Drift check (run first)**:
> `git diff --stat 5d8ebb6..HEAD -- docs/implementation/decision-records.md docs/scope/component-implementation-outline.md packages/coss-svelte/src/components/Field.svelte packages/coss-svelte/src/components/FieldDescription.svelte packages/coss-svelte/src/components/FieldError.svelte packages/coss-svelte/src/components/FieldLabel.svelte packages/coss-svelte/src/components/FieldValidity.svelte packages/coss-svelte/src/components/Input.svelte packages/coss-svelte/src/components/Textarea.svelte packages/coss-svelte/src/components/InputGroupInput.svelte packages/coss-svelte/src/components/InputGroupTextarea.svelte apps/www/src tests package.json pnpm-lock.yaml`
> Plan 002 must be complete. If the package does not have typed props, its own
> `check` script, and generated declarations, stop and complete plan 002 first.

## Status

DONE. Field associations are covered in browser, SSR, and hydration tests with
stable explicit IDs and generated IDs.

- **Priority**: P1
- **Effort**: M
- **Risk**: HIGH
- **Depends on**: `plans/002-make-package-contracts-real.md`
- **Category**: accessibility
- **Planned at**: commit `5d8ebb6`, 2026-07-15

## Why this matters

Field is marked stable, and ADR-003 assigns it concrete accessibility work.
Today the root only renders optional visual label, description, and error text;
the compound parts do not share state with the root or controls. As a result,
the simple Field example renders a label with no associated input and a
description the input never references. The Form example only works because it
manually repeats `id`, `for`, `aria-invalid`, and `aria-describedby` values.
Completing this contract fixes a stable public primitive and provides the first
runtime test harness for validating component behavior instead of source text.

## Current state

- `docs/implementation/decision-records.md:68-74` says Field owns label,
  control, description, error, required, disabled, and invalid presentation and
  consistently wires `id`, `aria-describedby`, `aria-invalid`, `data-invalid`,
  and `data-disabled`.
- `packages/coss-svelte/src/components/Field.svelte:4-35` accepts convenience
  strings and renders independent `<span>`/`<p>` elements. It generates no ID,
  creates no context, does not propagate disabled/invalid state, and duplicates
  the markup already exported as FieldLabel, FieldDescription, and FieldError.
- `FieldLabel.svelte:4-11`, `FieldDescription.svelte:5-15`,
  `FieldError.svelte:4-9`, and `FieldValidity.svelte:5-15` only style forwarded
  markup. They do not consume Field state or provide association IDs.
- `Input.svelte:4-7`, `Textarea.svelte:4-7`,
  `InputGroupInput.svelte:4-7`, and `InputGroupTextarea.svelte:4-7` forward
  native props but do not consume Field defaults. Input and Textarea also
  duplicate their InputGroup counterparts' prop-forwarding behavior.
- The Field example at
  `apps/www/src/lib/components/docs/component-preview-renderer.svelte:642-647`
  omits `for`, `id`, and `aria-describedby`. The Form example at lines 663-679
  manually wires all four values that Field is supposed to own.
- The repository has 77 passing tests, but none render or mount a Svelte
  component. Seventeen of the 20 test files inspect source text, so the green
  suite cannot detect broken label/control or description/control association.
- Svelte 5.56.3 supports `$props.id()` for SSR-stable component IDs. Bits UI
  2.18.1 does not expose a generic Field primitive, so this contract belongs in
  a small native Svelte context rather than a copied React/Base UI abstraction.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Field runtime tests | `pnpm test:components -- Field` | Field contract passes in DOM and SSR modes |
| Package check | `pnpm --filter coss-svelte check` | 0 errors, 0 warnings |
| Package tests | `pnpm --filter coss-svelte test` | exit 0 |
| Docs check | `pnpm --filter @coss-svelte/www check` | 0 errors, 0 warnings |
| Full gate | `pnpm release:check` | exit 0 |

## Suggested executor toolkit

- Add exact root dev dependencies `vitest@4.1.10`,
  `@testing-library/svelte@5.4.2`, and `jsdom@29.1.1`; keep Node's existing
  source-policy tests. Put component fixtures beside the component test suite,
  not in the public package or docs app.
- Use `$props.id()` once in the Field root to derive SSR/hydration-stable IDs.
  Put typed context creation and consumption in a focused internal
  `field-context.svelte.ts` module.
- Use native label/input semantics. Bits UI should remain the foundation for
  controls that already use Bits primitives, but do not copy Base UI or React
  Field source.

## Scope

**In scope**:

- Root test configuration/scripts and exact test dev dependencies
- a DOM-based Svelte component test harness and SSR render assertions
- `packages/coss-svelte/src/internal/field-context.svelte.ts` (create)
- `Field.svelte`, `FieldLabel.svelte`, `FieldDescription.svelte`,
  `FieldError.svelte`, and `FieldValidity.svelte`
- `Input.svelte`, `Textarea.svelte`, `InputGroupInput.svelte`, and
  `InputGroupTextarea.svelte`
- one representative simple fixture for each supported control class
- Field/Form/Fieldset docs examples and Field API documentation
- component metadata if the public prop surface changes
- `docs/scope/component-implementation-outline.md`
- `docs/references/version-baseline.md` for new tool versions
- source-shape tests that currently freeze the old manual ARIA example

**Out of scope**:

- App-wide validation, schema validation, error parsing, submission, or form
  store APIs.
- Adding Superforms, formsnap, Felte, Zod, or Valibot to the core package.
- Automatically associating one Field with multiple independent controls.
- Reimplementing Bits UI control behavior.
- Folding Fieldset into Field; grouped controls retain native fieldset/legend
  semantics.
- Broad component-family deduplication beyond the four native text controls.
- Visual redesign of form components.

## Git workflow

- Branch: `johann/005-field-semantics`
- Configure `.gitmessage.txt` before committing.
- Suggested commits:
  - `test(field): add runtime accessibility contracts`
  - `feat(field): wire native control semantics`
  - `refactor(field): compose convenience content from field parts`
  - `docs(field): demonstrate automatic aria wiring`
- Do not push or open a pull request unless asked.

## Steps

### Step 1: Establish the runtime component-test gate

Add Vitest with the Svelte/Vite transform already used by the workspace,
Testing Library, and jsdom. Keep the suite inside the package or a focused root
test directory, and expose:

```json
{
  "test:components": "vitest run",
  "test": "vitest run"
}
```

Integrate the package test into the existing recursive root `pnpm test`; do not
replace Node's catalog/policy tests. Add a minimal rendered Button or Input
smoke test first to prove compilation, DOM querying, cleanup, and event handling
work. Add a separate SSR assertion using Svelte's server renderer so DOM-only
success cannot hide hydration-unsafe markup.

Update `docs/references/version-baseline.md` with the exact new test-tool
versions and their roles.

**Verify**:
`pnpm test:components` -> the smoke test passes and exits 0.

### Step 2: Write the failing Field contract before changing components

Create fixture components that use only the public package surface. Express
these predicates through rendered DOM and SSR markup:

1. FieldLabel's generated `for` equals the nested Input's generated `id`.
2. FieldDescription and FieldError receive unique IDs, and the control's
   `aria-describedby` contains the IDs of mounted descriptive parts exactly
   once in stable order.
3. Invalid Field state yields `data-invalid` on Field and the supported control,
   plus `aria-invalid="true"` on the control.
4. Disabled and required Field defaults reach the supported native control and
   their visual/data state; explicit control props can opt out only where the
   documented API permits it.
5. Consumer-supplied `id`, label `for`, `aria-describedby`, `aria-invalid`,
   `required`, and `disabled` are preserved or merged by one documented
   precedence rule, never silently overwritten.
6. Two sibling Fields and nested component boundaries produce no duplicate IDs
   or context leakage.
7. Adding/removing conditional description, error, and validity messages keeps
   `aria-describedby` current without stale tokens.
8. Rendering without Field remains a plain native Input/Textarea and does not
   invent Field attributes.
9. SSR IDs match hydrated DOM and hydration emits no mismatch warning.

The suite should fail against the current components for association and state
propagation, not because of an invalid fixture import.

**Verify**:
`pnpm test:components -- Field` -> non-zero exit with the missing association
assertions identified.

### Step 3: Define one typed native Field context

Create a typed internal context whose state is owned by Field and consumed by
Field parts and supported controls. The context must provide:

- one base ID from `$props.id()` and derived control/description/error/validity
  IDs;
- reactive `required`, `disabled`, and `invalid` values;
- registration/unregistration of mounted descriptive parts;
- a deterministic, deduplicated described-by token list;
- helpers that merge inherited defaults with explicit native props; and
- a precise error when a Field-only part is rendered outside Field, while
  controls remain valid outside Field through optional context lookup.

Keep merge logic in pure typed functions and test it directly. Explicit native
props take precedence; `aria-describedby` is the exception that should merge
consumer tokens with registered Field tokens without changing consumer order.
Do not use a global store, query the DOM by slot selector, or add defensive
`any` casts.

Registration must work for initial DOM render, conditional changes, and SSR.
If child registration order makes accurate SSR `aria-describedby` impossible
with the current free-form children API, stop at this step and document the
smallest explicit API needed (for example, declared description/error IDs or a
FieldControl contract). Do not ship client-only attribute patching as if it
fulfilled the SSR contract.

**Verify**:
`pnpm --filter coss-svelte check` -> 0 errors and 0 warnings.

### Step 4: Make Field parts consume the contract

Update the compound parts as follows:

- Field owns context and places `data-invalid`, `data-disabled`, and
  `data-required` from its semantic props on the root.
- FieldLabel defaults `for` and required-marker state from context while
  preserving explicit `for` and `required` values.
- FieldDescription, FieldError, and FieldValidity default their IDs from
  context and register their presence. Explicit IDs become the registered IDs.
- FieldError retains `role="alert"` only for content that should be announced
  immediately; document when FieldValidity is the non-alert status surface.
- All parts keep native element prop types and ordinary standalone behavior
  only where that behavior is useful and documented.

Do not put label, error, or validation parsing into the context. It coordinates
semantics; it does not own application data.

**Verify**:
`pnpm test:components -- FieldLabel FieldDescription FieldError FieldValidity`
-> part association and conditional-registration tests pass.

### Step 5: Integrate the four native text controls through one helper

Make Input, Textarea, InputGroupInput, and InputGroupTextarea optionally consume
Field control props. Extract only the shared typed merge contract; retain the
correct native `<input>` and `<textarea>` elements and their distinct public
attribute types. Each control must:

- receive the generated ID and semantic defaults inside Field;
- preserve two-way value binding and native name/value/form behavior;
- merge explicit ARIA description tokens with Field tokens;
- expose invalid/disabled data attributes for styling; and
- behave unchanged outside Field.

Test Input and Textarea behavior directly, then use a small table-driven suite
for their InputGroup counterparts. Do not turn `Block.svelte` into a
polymorphic form-control component and do not erase input/textarea prop types
to remove four short templates.

For Bits-backed controls, document the adapter boundary in the implementation
outline. Add Field propagation only where the primitive already exposes a safe
public ID/ARIA hook; do not reach into Bits UI internals in this plan.

**Verify**:
`pnpm test:components -- Field Input Textarea InputGroup` -> all Field/control
contracts pass.

### Step 6: Remove the root's duplicate convenience markup

Choose one coherent public shape for Field's `label`, `description`, and
`error` convenience props:

- retain them by rendering the same internal semantic primitives/contracts as
  the exported Field parts; or
- deprecate and remove them in the next allowed breaking release, migrating all
  local uses to compound parts.

Do not keep the current independent `<span>`/`<p>` fallback. Whichever option is
chosen, encode it in the typed public props and add parity tests showing that
convenience and compound forms produce the same IDs, state attributes, and ARIA
relationships. Avoid a second styling or association path.

**Verify**:
`rg -n 'cn-field-(description|error)|cn-label' packages/coss-svelte/src/components/Field.svelte`
-> no independent hand-authored part markup remains.

### Step 7: Rewrite examples and API docs around automatic wiring

Update the Field example so it demonstrates generated label/control and
description/control association with no manual IDs. Update the Form example so
its validation state is passed through Field props and the error part supplies
its own registered ID. Preserve native `name`, `type`, `required`, and value
behavior.

Add examples for:

- description plus conditional error;
- required and disabled state;
- an explicit custom control ID/description token override; and
- Fieldset for grouped controls rather than forcing a multi-control Field.

Update API data and `docs/scope/component-implementation-outline.md` with the
final context/precedence strategy. Remove source-shape assertions that require
the old manually wired Form markup; replace them with runtime assertions or an
example-render contract.

**Verify**:
`! rg -n 'form-email-error|aria-describedby=\{formEmailInvalid' apps/www/src`
-> exit 0.

**Verify**:
`pnpm --filter @coss-svelte/www check` -> 0 errors and 0 warnings.

### Step 8: Exercise SSR, hydration, and the full release path

Run the Field fixtures through SSR and hydrate the same markup in jsdom. Capture
console warnings as test failures. Assert stable IDs and associations before
and after conditional error changes. Then run the full package and repository
gates and inspect the diff for validation-framework creep or unrelated control
changes.

**Verify**:
`pnpm install --frozen-lockfile && pnpm release:check` -> exit 0.

**Verify**:
`git diff --check && git diff --stat` -> no whitespace errors and only the
documented test, Field/control, docs, metadata, and lockfile scope changed.

## Test plan

- Runtime DOM tests cover generated and explicit IDs, label association,
  merged descriptions, invalid/required/disabled propagation, conditional
  messages, sibling isolation, and standalone controls.
- SSR/hydration tests assert identical IDs/relationships and fail on hydration
  warnings.
- Pure helper tests cover prop precedence and ordered token deduplication.
- One table-driven suite covers Input, Textarea, InputGroupInput, and
  InputGroupTextarea without copying the same assertions four times.
- Existing Node policy/catalog tests remain green; obsolete source-text Field
  assertions are removed rather than updated to a new implementation string.
- Docs checks prove examples consume the typed public API.

## Done criteria

- [x] The repository has a working Svelte runtime component-test gate included
      in `pnpm test` and `pnpm release:check`.
- [x] Field owns one typed, SSR-safe context with deterministic IDs.
- [x] Label, description, error, and validity parts associate automatically.
- [x] Input, Textarea, InputGroupInput, and InputGroupTextarea inherit Field
      semantics without losing native props or standalone behavior.
- [x] Explicit consumer props follow one tested precedence/merge rule.
- [x] Conditional messages do not leave stale `aria-describedby` tokens.
- [x] Convenience props and compound parts no longer use duplicate markup or
      semantic paths.
- [x] Field/Form docs contain no manual local ID choreography for the ordinary
      case.
- [x] The implementation outline and version baseline reflect the final
      strategy and test tooling.
- [x] DOM, SSR, hydration, package, docs, and full release checks pass.
- [x] `plans/README.md` marks plan 005 `DONE`.

## STOP conditions

Stop and report if:

- Any in-scope file materially changed since commit `5d8ebb6` and the current
  excerpts or contract no longer match.
- Plan 002 is incomplete or the public prop/declaration pipeline still erases
  component types.
- Accurate initial SSR association requires client-only DOM scanning or
  post-hydration mutation with the free-form children API. Propose the smallest
  explicit FieldControl/ID contract before proceeding.
- A use case requires multiple independent controls in one Field. Move it to
  Fieldset or obtain an explicit group-association design decision.
- A Bits-backed control lacks a supported public ID/ARIA hook. Leave that
  adapter documented and out of scope rather than reaching into internals.
- The implementation starts parsing validation-library errors or owning form
  submission state.
- A verification fails twice after a focused correction.

## Maintenance notes

- New native controls should use the typed optional Field-control helper and
  join the table-driven contract suite.
- New descriptive parts must register through context and participate in the
  ordered token test; do not concatenate ARIA strings locally.
- Field remains a one-control semantic unit. Use Fieldset for related control
  groups and native form APIs for submission/serialization.
- When a Bits UI upgrade adds a generic Field primitive, compare its contract
  deliberately. Do not replace this public API solely to reduce internal code.
