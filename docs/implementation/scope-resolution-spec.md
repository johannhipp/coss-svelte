# Scope Resolution Spec

This spec resolves the open-ended areas found in the current COSS Svelte scope documents before component implementation begins.

The guiding preference is quality over forced parity: ship a clean, idiomatic Svelte library that covers roughly 90% of COSS first, and defer or mark experimental anything that would require brittle custom behavior.

## Inputs Reviewed

- `docs/scope/source/00-component-index.md`
- `docs/scope/source/01-source-audit.md`
- `docs/scope/component-implementation-matrix.md`
- `docs/scope/component-implementation-outline.md`
- `docs/implementation/phases.md`
- `docs/architecture/monorepo-structure.md`
- COSS local upstream cache in `.cache/upstream/coss`
- Bits UI local docs cache in `.cache/upstream/bits-ui`
- shadcn-svelte local upstream cache in `.cache/upstream/shadcn-svelte`
- COSS skill references for styling, composition, forms, drawer, number field, select, and toast

## Executive Decision

The scope is not implementation-ready as written. The inventory is complete, but several contracts must be decided before code starts:

- Public Svelte API and export naming.
- Styling and token generation pipeline.
- Form architecture and validation responsibility.
- Registry and package boundary.
- Date Picker implementation source.
- High-risk custom component scope for Drawer, Number Field, and Toast.
- Particle selection policy.
- Verification gates per component class.

Recommended path: implement a package-first, COSS-looking, Svelte-idiomatic library backed by Bits UI where possible. Keep COSS visual language and component names where they help migration, but do not recreate React/Base UI behavior when Bits UI already provides a Svelte-native equivalent or when the behavior is too expensive to make robust.

## Decision Matrix

| Area | Recommendation | Status Before Coding |
| --- | --- | --- |
| Public API | Use COSS-facing names with Svelte-native props, snippets, and bindings. | Must be accepted in ADR-001. |
| Styling | Use shadcn-svelte-style `cn-*` placeholder classes resolved by a registry build, with one default COSS style first. | Must be accepted in ADR-002. |
| Forms | Native-first Field/Form contract with SvelteKit examples, no hard dependency on a form library. | Must be accepted in ADR-003. |
| Registry | Hybrid package plus registry, but package-first. Build metadata from source components from day one; CLI later. | Must be accepted in ADR-004. |
| Date Picker | Keep in scope by wrapping Bits UI DatePicker and DateRangePicker. | Ready after API naming ADR. |
| Drawer | Reduce to Dialog-backed drawer for v0.1; defer snap points, swipe gestures, nested drawers, and drawer menus. | Mark experimental if shipped early. |
| Number Field | Defer stable Number Field; use native number inputs in Field/Input examples until an accessible spinbutton spec is written. | Out of stable v0.1. |
| Toast | Ship only basic global Toast if tested; defer anchored toasts, swipe gestures, promise helpers, and dedupe/upsert semantics. | Experimental until tests pass. |
| Particles | Port 1 to 3 high-signal examples per stable component first; full COSS particle parity is post-stable. | Needs metadata field for priority. |
| Verification | Use component-family gates instead of one generic checklist. | Must be wired into implementation tickets. |

## ADR-001: Public API and Naming

### Problem

The outline repeatedly says "define public Svelte exports/naming" but does not decide whether the library should copy COSS React names, expose Bits UI names, or invent Svelte-specific names. This affects every component file, docs page, particle example, and registry entry.

### Options

| Option | Upside | Downside |
| --- | --- | --- |
| Exact COSS names | Best conceptual parity for COSS users. | Can feel React-shaped when behavior depends on Base UI render props and React event naming. |
| Exact Bits UI names | Most idiomatic Svelte primitive layer. | Loses COSS migration value and visual API identity. |
| COSS-facing aliases over Svelte/Bits internals | Keeps COSS mental model while using Svelte-native mechanics. | Requires a naming map and discipline in docs. |

### Recommendation

Use COSS-facing aliases over Svelte/Bits internals.

Rules:

- Source folders live under `packages/coss-svelte/src/lib/registry/ui/<slug>`.
- Each component exports from `index.ts`.
- Export names should stay close to COSS names when the concept exists: `Dialog`, `DialogTrigger`, `DialogPopup`, `DialogPanel`, `DialogTitle`, `DialogDescription`, `DialogClose`, `Select`, `SelectTrigger`, `SelectPopup`, `SelectItem`, and similar.
- Internally map to Bits UI primitives when available.
- Use Svelte 5 snippets instead of React render props.
- Use `bind:value`, `bind:open`, `bind:checked`, and function bindings for controlled state.
- Expose `class` as a normal prop and compose with the local `cn` utility.
- Expose element refs through `$bindable` props where useful.
- Preserve `data-slot` attributes so styling, tests, and registry output have stable selectors.
- Avoid generic `asChild` unless a specific component needs a child-snippet wrapper. When it is needed, model it after Bits UI child snippets.

Example target shape:

```svelte
<script lang="ts">
  import { Dialog as DialogPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    class: className,
    children,
    ...restProps
  } = $props();
</script>

<DialogPrimitive.Content
  data-slot="dialog-popup"
  class={cn("cn-dialog-popup", className)}
  {...restProps}
>
  {@render children?.()}
</DialogPrimitive.Content>
```

### Non-goals

- Do not support both React-style and Svelte-style APIs.
- Do not expose every Bits UI part just because it exists.
- Do not hide Bits UI value types when doing so would create conversion bugs.

## ADR-002: Styling, Tokens, and Build Pipeline

### Problem

The current docs say to define tokens and decide whether to use shadcn-svelte's `cn-*` placeholder strategy. Without this decision, implementation can drift between direct Tailwind classes, package CSS, and registry-transformed output.

### Options

| Option | Upside | Downside |
| --- | --- | --- |
| Direct Tailwind classes inside every component | Simple to start. | Hard to update at COSS scale; registry output becomes noisy; variant reuse is weaker. |
| Component-scoped CSS | Works in Svelte packages. | Does not match shadcn/COSS copy-and-own ergonomics well. |
| `cn-*` placeholder classes resolved at registry build time | Matches shadcn-svelte's migration model and keeps source components readable. | Requires build tooling before the registry is useful. |

### Recommendation

Use a shadcn-svelte-style `cn-*` placeholder class pipeline, but start with only one style preset: the COSS default.

Rules:

- Keep source components readable with placeholder classes such as `cn-button`, `cn-button-variant-primary`, `cn-dialog-popup`, and `cn-field-error`.
- Store the default style map in `packages/theme/src/style-coss.css`.
- Use `tailwind-variants` for components with meaningful variants.
- Resolve placeholder classes during registry generation so copy-and-own output contains real Tailwind v4 classes.
- Keep semantic CSS variables for colors, radius, typography, density, and motion.
- Preserve COSS font variable names where possible: `--font-sans`, `--font-mono`, and `--font-heading`.
- Use `data-slot` selectors for component part styling and tests.
- Keep package consumption simple: package consumers import the theme CSS, registry consumers receive resolved component files.

### Required Build Outputs

- Package source output for imports from `@coss-svelte/ui`.
- Registry JSON output with resolved component files.
- Theme CSS output for package users.
- A validation script that fails if a component contains an unresolved `cn-*` class that is not present in the style map.

### Non-goals

- Do not support multiple visual style presets in v0.1.
- Do not attempt pixel-perfect COSS parity by hard-coding every generated selector in component files.
- Do not add global CSS that silently styles arbitrary app markup outside the component data slots.

## ADR-003: Form Architecture

### Problem

COSS Form is based on Base UI form behavior. The Svelte scope currently says "native form" and "optional validation adapters" but does not define what belongs in core versus examples.

### Options

| Option | Upside | Downside |
| --- | --- | --- |
| Native form only | Small and framework-agnostic. | Less helpful for validation-heavy apps. |
| Hard dependency on Superforms/formsnap | Rich SvelteKit ergonomics. | Couples the core component library to one app-level form stack. |
| Native core with adapter examples | Keeps library portable and still teaches real usage. | Requires clear docs so users know where validation lives. |

### Recommendation

Use a native core with adapter examples.

Core responsibilities:

- `Form` is a thin native `<form>` wrapper.
- `Field` owns label, control, description, error, required, disabled, and invalid presentation.
- `Field` wires `id`, `aria-describedby`, `aria-invalid`, `data-invalid`, and `data-disabled` consistently.
- Inputs expose native `name`, `required`, `disabled`, and `value` behavior.
- Grouped controls use `Fieldset` and native legend semantics where appropriate.

Example responsibilities:

- Show SvelteKit `use:enhance` in docs.
- Show Zod validation in docs without making Zod a core dependency unless a specific component needs it.
- Show Superforms/formsnap integration as optional examples after core components are stable.

### Non-goals

- Do not clone Base UI `onFormSubmit` object parsing for v0.1.
- Do not make `Form` own validation state globally.
- Do not require any SvelteKit-only form library in `packages/coss-svelte`.

## ADR-004: Registry and Package Boundary

### Problem

The architecture doc says package-first before CLI, while the COSS model is registry-oriented. The scope does not yet say which files are source of truth or when registry generation becomes required.

### Options

| Option | Upside | Downside |
| --- | --- | --- |
| Package only | Fastest way to build reusable components. | Misses the COSS/shadcn copy-and-own developer experience. |
| Registry only | Strongest shadcn-like behavior. | Slower to validate package imports and SvelteKit docs. |
| Hybrid, staged | Supports both library imports and future copy-and-own installation. | Requires metadata discipline early. |

### Recommendation

Use a hybrid model, staged as package-first.

Rules:

- Source components, examples, and metadata live under `packages/coss-svelte/src/lib/registry`.
- Docs import directly from source during development through aliases.
- `packages/registry` owns schemas and dependency graph validation.
- `apps/registry` serves generated static JSON only after the first implementation batch is stable.
- `packages/cli` is deferred until at least 10 stable components prove the registry shape.
- Metadata mirrors shadcn-svelte concepts: `name`, `title`, `description`, `type`, `files`, `dependencies`, `devDependencies`, `registryDependencies`, `cssVars`, `meta`, `categories`, and `docs`.

### Minimum Registry Item Shape

```ts
type RegistryItem = {
  name: string;
  title: string;
  description: string;
  type: "registry:ui" | "registry:component" | "registry:example" | "registry:hook" | "registry:lib";
  files: Array<{
    path: string;
    target: string;
    type: RegistryItem["type"];
  }>;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  cssVars?: Record<string, string>;
  meta?: {
    status: "stable" | "experimental" | "deferred";
    foundation: "bits" | "native" | "compound" | "custom";
    particlePriority?: "mvp" | "later" | "unsupported";
  };
  categories?: string[];
  docs?: string;
};
```

### Non-goals

- Do not build the CLI before the registry can install a meaningful component set.
- Do not duplicate source components between package and registry.
- Do not treat docs examples as the only registry source of truth.

## ADR-005: Date Picker Scope

### Problem

COSS Date Picker is listed from live docs and particles, not from a local primitive reference. The matrix says to prefer Bits UI DatePicker where it matches, otherwise compose Popover, Button, and Calendar. Bits UI has DatePicker and DateRangePicker, so this should be decided.

### Options

| Option | Upside | Downside |
| --- | --- | --- |
| Compose from Calendar and Popover | Maximum visual control. | Rebuilds behavior Bits UI already provides. |
| Wrap Bits UI DatePicker and DateRangePicker | Uses maintained Svelte date behavior. | Public values follow Bits UI and `@internationalized/date`. |
| Drop Date Picker | Reduces scope. | Leaves a visible COSS component gap. |

### Recommendation

Keep Date Picker in stable scope by wrapping Bits UI DatePicker and DateRangePicker.

Rules:

- Public value type follows Bits UI and `@internationalized/date` for v0.1.
- Provide examples for display formatting and SvelteKit form serialization.
- Support single-date and range picker examples.
- Do not add arbitrary JS `Date`, ISO string, and formatted string conversion APIs until the base component is stable.
- Port only COSS particles that map cleanly to Bits UI DatePicker parts.

## ADR-006: High-Risk Custom Components

The current scope includes Drawer, Number Field, and Toast as custom high-risk components. These are the places most likely to harm quality if implemented for visual parity alone.

### Drawer

Problem: COSS Drawer includes mobile-first panels, handles, snap points, nested drawers, responsive dialog/menu drawer patterns, and swipe gestures. Bits UI has Dialog but no Drawer primitive.

Recommendation: reduce Drawer scope for v0.1.

Stable v0.1 behavior:

- Dialog-backed focus management, escape handling, portal behavior, and outside-click behavior.
- Side and bottom placement classes.
- Header, title, description, panel, body, footer, close, and handle parts.
- Controlled `bind:open`.
- Responsive examples that switch between Dialog/Sheet/Drawer visually.

Deferred behavior:

- Drag gestures.
- Snap points.
- Nested drawers.
- Swipe area tuning.
- Drawer menu variants.
- Physics-based animation.

Status: Drawer may ship as `experimental` in v0.1. It should not be called stable until interaction tests cover focus, scroll locking, mobile viewport behavior, and reduced-motion behavior.

### Number Field

Problem: COSS Number Field includes increment/decrement controls, scrub area, bounds, formatting, and Field integration. Bits UI does not currently provide a Number Field primitive.

Recommendation: defer stable Number Field.

Stable v0.1 alternative:

- Document `Input type="number"` with `Field`, `InputGroup`, step buttons where appropriate, and browser-native validation.

Possible experimental Number Field:

- Native input foundation.
- Increment and decrement buttons.
- `min`, `max`, `step`, `value`, `bind:value`, `disabled`, `required`.
- Keyboard support for ArrowUp, ArrowDown, Home, End, PageUp, and PageDown only after tests exist.

Deferred behavior:

- Scrub area.
- Locale-aware parsing and formatting.
- Custom spinbutton role unless fully specified and tested.
- Mouse wheel value changes by default.

Status: out of stable v0.1. Add only after an accessibility spec is written.

### Toast

Problem: COSS Toast includes global and anchored providers, managers, lifecycle helpers, promise helpers, dedupe/upsert behavior, and swipe/dismiss interactions. Bits UI does not currently provide Toast.

Recommendation: ship a basic global Toast only if it remains small and well-tested; otherwise defer.

Allowed v0.1 behavior:

- `ToastProvider`.
- `ToastViewport`.
- `ToastRoot`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`.
- A small `toastManager.add`, `toastManager.update`, and `toastManager.dismiss` API.
- Auto-dismiss, pause-on-hover, and escape/focus behavior only if covered by tests.

Deferred behavior:

- Anchored toasts.
- Promise helper API.
- Dedupe/upsert semantics.
- Swipe gestures.
- Multiple independent viewport managers.

Status: experimental until browser interaction tests pass. Do not market it as full COSS Toast parity in v0.1.

## ADR-007: Particle Scope

### Problem

COSS has hundreds of particles. The current outline says "highest-signal" without defining how to choose them. Full particle parity before primitive stability would slow implementation and hide API problems inside examples.

### Recommendation

Use a three-tier particle policy.

MVP particle criteria:

- Shows the default usage every user expects.
- Shows the component inside `Field`, `Form`, or an overlay when that is the main real-world composition.
- Shows exactly one advanced or distinctive COSS pattern if it validates API shape.

Later particle criteria:

- Pure visual variations.
- Similar examples that only change labels or icons.
- Examples depending on deferred component features.

Unsupported particle criteria:

- Requires a deferred behavior such as drawer snap points, toast promises, scrub number fields, or anchored toast managers.
- Requires React/Base UI behavior with no clean Svelte equivalent.

Rules:

- Each stable component gets 1 to 3 MVP particles before docs are considered complete.
- Components with zero upstream particles, currently Label and Sidebar, get hand-authored Svelte examples.
- Full COSS particle parity is a post-stable milestone, not a v0.1 requirement.
- Registry metadata stores `particlePriority` so docs can separate MVP, later, and unsupported examples.

## ADR-008: Verification Gates

### Problem

The outline repeats a generic verification sentence for every component. That is not specific enough to catch component-family failures.

### Recommendation

Use verification gates by foundation type.

Global gates for every component:

- `pnpm biome:ci`.
- `pnpm check`.
- SSR render smoke test in the SvelteKit docs app.
- Hydration smoke test in the browser.
- Keyboard tab order smoke test where focusable elements exist.
- Disabled, invalid, and loading states where applicable.
- `data-slot` selectors present for exported parts.

Presentational components:

- Snapshot or DOM assertions for variants and sizes.
- Native semantic element checks.
- Reduced-motion behavior for Spinner and Skeleton.

Bits UI wrappers:

- Controlled and uncontrolled state checks.
- Keyboard navigation checks.
- Focus restoration checks for overlays.
- Portal mount and unmount checks for popups.
- Form serialization checks when values submit through native forms.

Compound components:

- Composition examples must render in docs and as registry output.
- Nested component interactions must be tested, especially Field plus Select, Dialog plus Form, and Menu plus Checkbox/Radio items.

Custom components:

- Must have browser interaction tests before stable status.
- Must have explicit accessibility notes in the component doc.
- Must define unsupported COSS behavior in the docs page.

High-risk component gates:

- Drawer: focus trap, scroll lock, escape, outside click, reduced motion, mobile viewport, and placement checks.
- Number Field: keyboard support, min/max/step, form serialization, screen-reader role decision, and invalid states.
- Toast: provider lifecycle, auto-dismiss, manual dismiss, action focus, viewport placement, and reduced motion.

## v0.1 Scope Recommendation

The v0.1 target should be a stable package that demonstrates the visual language, covers common application work, and avoids pretending to support interactions that are not robust yet.

### Stable v0.1

- Accordion
- Alert
- Alert Dialog
- Autocomplete
- Avatar
- Badge
- Breadcrumb
- Button
- Calendar
- Card
- Checkbox
- Checkbox Group
- Collapsible
- Combobox
- Command
- Date Picker
- Dialog
- Empty
- Field
- Fieldset
- Form
- Frame
- Group
- Input
- Input Group
- Kbd
- Label
- Menu
- Meter
- OTP Field
- Pagination
- Popover
- Preview Card
- Progress
- Radio Group
- Scroll Area
- Select
- Separator
- Sheet
- Skeleton
- Slider
- Spinner
- Switch
- Table
- Tabs
- Textarea
- Toggle
- Toggle Group
- Toolbar
- Tooltip

### Experimental v0.1

- Drawer, reduced to a Dialog-backed edge panel without drag, snap points, nested drawers, or drawer menu variants.
- Toast, only if the basic global manager and viewport pass browser tests.
- Sidebar, if app-shell layout tokens and responsive behavior are resolved during the docs app build.

### Deferred From Stable v0.1

- Number Field.
- Full Drawer parity.
- Full Toast parity.
- Full particle parity.
- CLI installer.
- Multiple visual style presets.
- Superforms/formsnap adapters in core.

This keeps the initial stable component set broad while reserving the custom interaction-heavy components for focused design and test work.

## Component Implementation Order Adjustments

Keep the existing phase structure, with these changes:

1. Phase 0 must finish ADR-001 through ADR-004 before component code begins.
2. Move Date Picker into the direct Bits-backed track after Calendar, because Bits UI provides DatePicker and DateRangePicker.
3. Treat Drawer, Number Field, and Toast as separate design spikes before implementation.
4. Move Sidebar behind the first docs app shell decision, because its behavior is tightly coupled to navigation layout.
5. Do not start particle bulk-porting until the component API and registry item shape are stable.

## Implementation Readiness Checklist

Implementation can begin when these are true:

- ADR-001 public API and export naming is accepted.
- ADR-002 styling/token pipeline is accepted.
- ADR-003 Form and Field contract is accepted.
- ADR-004 registry/package source of truth is accepted.
- The v0.1 stable, experimental, and deferred lists are accepted.
- Verification gates are attached to the first component tickets.
- `biome` remains the only lint/format tool; no ESLint or Prettier config is introduced.

## Remaining Open Questions

These should be answered before the first component implementation PR:

1. Should the package name be `@coss-svelte/ui`, `coss-svelte`, or something else?
2. Should COSS-facing part names use `Popup` where COSS does, or normalize Svelte docs around `Content` while exporting `Popup` aliases?
3. Should package consumers import one global theme CSS file, or should components also work with resolved registry classes only?
4. Where should docs examples live: beside component source under `packages/coss-svelte`, or in `apps/www` with registry metadata pointing to them?
5. Should experimental components be exported from the main package entrypoint or from `@coss-svelte/ui/experimental`?
6. What is the exact browser support matrix for interaction tests?

## Recommended Next Step

Create short ADR files or convert the ADR sections above into checked-off decisions, then implement the first batch in this order:

1. Theme tokens and `cn-*` validation script.
2. Button, Badge, Input, Textarea, Label, Field, and Card.
3. Dialog, Popover, Tooltip, Select, Checkbox, Radio Group, Switch, and Tabs.
4. Calendar and Date Picker.
5. Registry generation for the first stable batch.

This order validates the styling pipeline, Field contract, Bits wrapper model, and registry metadata before touching the custom high-risk components.
