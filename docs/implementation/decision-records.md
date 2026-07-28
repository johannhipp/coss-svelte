# Decision Records

This file explains the decisions behind the v0.1 scope. The short current scope lives in [v0.1 Scope Decisions](./v0.1-scope-decisions.md).

## ADR-001: Public API And Naming

### Problem

The COSS inventory uses React and Base UI concepts, while `coss-svelte` needs to feel native in SvelteKit. Copying React-shaped APIs would make common Svelte patterns harder.

### Decision

Use COSS-facing component and part names over Svelte/Bits internals.

Rules:

- Keep names close to COSS when the concept exists: `Dialog`, `DialogTrigger`, `DialogPopup`, `DialogPanel`, `Select`, `SelectTrigger`, `SelectPopup`, `SelectItem`, and similar.
- Use Svelte snippets instead of React render props.
- Use `bind:value`, `bind:open`, `bind:checked`, and function bindings for controlled state.
- Expose `class` as a normal prop and compose with the local `cn` utility.
- Preserve `data-slot` attributes for styling, tests, and registry output.
- Avoid generic `asChild` unless a component specifically needs child-snippet composition.

### Why

COSS names preserve migration value and documentation familiarity. Bits UI and Svelte bindings preserve native behavior and reduce the need for custom state code.

### Gap To 100%

React render props, Base UI-specific event names, and every low-level primitive part are not copied by default. Compatibility aliases can be added later only where they do not confuse the Svelte API.

## ADR-002: Styling, Tokens, And Build Pipeline

### Problem

The library needs to support both package consumption and a future copy-and-own registry model without turning every component into a wall of Tailwind classes.

### Decision

Use shadcn-svelte-style `cn-*` placeholder classes in source components and resolve them into real Tailwind v4 classes during registry generation. Start with one COSS default theme.

Rules:

- Keep source components readable with classes such as `cn-button`, `cn-dialog-popup`, and `cn-field-error`.
- Store the default style map in `packages/theme/src/style-coss.css`.
- Use semantic CSS variables for colors, radius, typography, density, and motion.
- Use `data-slot` selectors for component part styling and tests.
- Validate unresolved `cn-*` classes in CI.

### Why

This keeps component source maintainable while preserving COSS/shadcn copy-and-own ergonomics.

### Gap To 100%

Multiple style presets, pixel-perfect parity, and full visual regression are post-v0.1 work.

## ADR-003: Form Architecture

### Problem

COSS Form is tied to Base UI behavior. SvelteKit developers may use native actions, `use:enhance`, Superforms, formsnap, Felte, Zod, Valibot, or custom validation.

### Decision

Use a native-first core with adapter examples.

Core responsibilities:

- `Form` is a thin native `<form>` wrapper.
- `Field` owns label, control, description, error, required, disabled, and invalid presentation.
- `Field` wires `id`, `aria-describedby`, `aria-invalid`, `data-invalid`, and `data-disabled` consistently.
- Inputs expose native `name`, `required`, `disabled`, and `value` behavior.
- Grouped controls use `Fieldset` and native legend semantics where appropriate.

### Why

Core components should own accessibility and presentation, not impose a validation stack.

### Gap To 100%

Optional Superforms/formsnap/Zod/Valibot adapters and complex form serialization helpers remain later work.

## ADR-004: Registry And Package Boundary

### Problem

COSS is registry-oriented, but the first implementation needs fast package imports and reliable local testing.

### Decision

Use a hybrid model, staged as package-first.

Rules:

- Source components live in `packages/coss-svelte/src/components`.
- Metadata lives with the package and feeds generated registry output.
- `packages/registry` owns registry schemas and generated exports.
- `apps/registry` serves static registry JSON.
- `packages/cli` is deferred until registry output is proven.

### Why

This supports a working package immediately while keeping the registry path open.

### Gap To 100%

Hosted registry guarantees, CLI install/update flow, dependency migration tooling, and update diffs are later work.

## ADR-005: Date Picker Scope

### Problem

Date Picker appears in the live COSS docs but not in the local primitive reference set. Rebuilding it from Calendar and Popover would duplicate hard date behavior.

### Decision

Keep Date Picker in stable scope by wrapping Bits UI DatePicker and DateRangePicker.

Rules:

- Public value types follow Bits UI and `@internationalized/date` in v0.1.
- Provide display formatting examples.
- Provide SvelteKit form serialization examples.
- Do not add arbitrary `Date`, ISO string, and formatted string conversion APIs until the base component is stable.

### Why

Bits UI already owns the hard Svelte date picker behavior: segments, calendar integration, popover behavior, range support, and controlled state.

### Gap To 100%

Extra value conversion helpers, timezone and locale edge cases, and full COSS Date Picker particle parity remain later work.

## ADR-006: High-Risk Custom Components

### Problem

Drawer, Number Field, and Toast look like components, but their full COSS behavior requires custom interaction systems.

### Decision

Reduce or defer high-risk custom behavior:

- Drawer ships only as an experimental Dialog-backed edge panel.
- Number Field is deferred from stable v0.1.
- Toast ships as an experimental provider/manager-backed surface with basic add
  and dismiss behavior. It remains experimental until queueing, timing,
  updates, focus, and gesture behavior are specified and tested.

### Why

These components can harm quality if they are implemented as visual clones without the required keyboard, focus, gesture, lifecycle, and accessibility behavior.

### Gap To 100%

Drawer needs gestures, snap points, nested stacks, and mobile physics. Number
Field needs a real spinbutton spec. Toast needs complete queue and timing
rules, update and dedupe/upsert semantics, promise helpers, focus behavior, and
swipe behavior.

## ADR-007: Particle Scope

### Problem

COSS has hundreds of particles. Full particle parity before primitive stability would slow implementation and hide API problems inside examples.

### Decision

Use a three-tier particle policy:

- MVP: default usage, real composition, or one distinctive pattern that validates the API.
- Later: visual variations and similar examples.
- Unsupported: particles that require deferred behavior or React/Base UI mechanics with no clean Svelte equivalent.

### Why

MVP particles should prove component APIs first. Full catalog parity should happen after the component surface is stable.

### Gap To 100%

Every COSS particle needs a Svelte status, visual tests, and a reason when unsupported.

## ADR-008: Verification Gates

### Problem

One generic checklist is not enough. Buttons, Dialogs, Selects, Drawers, and Toasts fail in different ways.

### Decision

Use component-family verification gates.

Global gates:

- `pnpm biome:ci`
- `pnpm check`
- SSR render smoke test in the SvelteKit docs app
- Hydration smoke test in the browser
- Keyboard tab order smoke test where focusable elements exist
- Disabled, invalid, and loading states where applicable
- `data-slot` selectors for exported parts

Family-specific gates:

- Presentational components need variant, semantic element, and reduced-motion checks where relevant.
- Bits UI wrappers need controlled/uncontrolled state, keyboard navigation, focus restoration, portal, and form serialization checks where relevant.
- Compound components need docs examples and nested interaction tests.
- Custom components need browser interaction tests before stable status.

### Why

The verification strategy should match the real failure mode of each component family.

### Gap To 100%

Full visual regression, mobile viewport suites, assistive-technology checks, and per-component acceptance matrices are later work.
