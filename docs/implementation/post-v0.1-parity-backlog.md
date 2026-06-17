# Post-v0.1 Parity Backlog

This document records the work intentionally left out of stable v0.1 so the first implementation can stay clean and Svelte-native.

The intent is not to lower ambition. The intent is to avoid shipping fragile Svelte implementations of React/Base UI behavior before we have the right primitives, tests, and API contracts.

Read this after [v0.1 Scope Decisions](./v0.1-scope-decisions.md) and [Decision Records](./decision-records.md). For implementation-time skips and partial components, use [Unimplemented Components And Parity Gaps](./unimplemented-components.md).

## Scope Delta

The 90% scope means:

- Keep the COSS visual language.
- Keep the broad COSS component surface.
- Use Svelte-native APIs instead of React-shaped APIs.
- Use Bits UI where it provides maintained behavior.
- Mark risky custom behavior as experimental or defer it.
- Port enough particles to prove the component APIs, not every COSS example immediately.

The 100% parity target adds:

- Full Drawer behavior.
- Full Number Field behavior.
- Full Toast manager behavior.
- Full particle parity.
- CLI install/update parity.
- Exact COSS visual regression coverage.
- Broader form adapters.
- More exact React/Base UI behavior mapping where it is worth preserving.

## Priority Bands

| Band | Work | Why It Comes Here |
| --- | --- | --- |
| Foundation | Registry validation, visual regression baseline, particle tracker. | These stabilize the library before adding riskier behavior. |
| Interaction spikes | Toast manager, Drawer gestures, Number Field accessibility. | These require focused specs and browser tests. |
| Ecosystem | CLI install/update flow, adapters, starter templates. | These depend on stable package and registry output. |
| Exact parity | Pixel pass, full particle catalog, Base UI compatibility notes. | These are valuable after the Svelte-native API is proven. |

## Backlog At A Glance

| ID | Area | v0.1 Position | 100% Parity Work |
| --- | --- | --- | --- |
| P01 | Public API | COSS-facing names with Svelte-native mechanics. | Compatibility aliases and migration tables where useful. |
| P02 | Styling and tokens | One default COSS-like style. | Pixel parity, visual regression, and any future style presets. |
| P03 | Forms | Native-first core plus examples. | Optional adapters and deeper serialization helpers. |
| P04 | Registry and CLI | Package-first with registry metadata. | Hosted registry, install/update CLI, and dependency migration tools. |
| P05 | Date Picker | Bits UI DatePicker and DateRangePicker. | Extra value conversion helpers, locale cases, and full particle coverage. |
| P06 | Drawer | Reduced Dialog-backed drawer, experimental if shipped. | Snap points, gestures, nested drawers, drawer menus, and mobile physics. |
| P07 | Number Field | Deferred from stable v0.1. | Full accessible spinbutton, formatting, scrub area, and interaction tests. |
| P08 | Toast | Basic global toast only if tested. | Anchored providers, promise helpers, dedupe/upsert, swipe, and lifecycle parity. |
| P09 | Particles | 1 to 3 MVP particles per stable component. | Full COSS particle parity and unsupported-particle tracking. |
| P10 | Verification | Component-family gates. | Full visual, browser, mobile, and assistive-tech matrices. |
| P11 | Exact visual parity | COSS visual language. | Screenshot parity against coss.com references. |
| P12 | Ecosystem integration | Clean SvelteKit/Vite package. | Optional adapters, starter templates, and install automation. |

## P01: Public API Parity

### v0.1 Decision

Use COSS-facing component and part names, but implement them with Svelte-native props, snippets, bindings, and Bits UI internals.

Examples:

- Keep names such as `DialogPopup`, `DialogPanel`, `SelectTrigger`, `SelectPopup`, `Field`, and `InputGroup`.
- Use Svelte snippets instead of React render props.
- Use `bind:value`, `bind:open`, `bind:checked`, and function bindings.
- Use a normal `class` prop.
- Use `$bindable` refs where refs are part of the public API.
- Preserve `data-slot` selectors.

### Why This Decision

Exact COSS names help users understand the library and compare docs. Exact React/Base UI mechanics would make the Svelte implementation awkward. Bits UI already has Svelte-native state and composition patterns, so the API should meet Svelte developers where they are.

### 90% Coverage

- Most component names and part names match the COSS mental model.
- Common state control maps cleanly to Svelte bindings.
- Components remain idiomatic in SvelteKit.

### Gap To 100%

- React render props are not copied.
- Base UI-specific prop names and event contracts are not copied by default.
- Some COSS `Popup` names may map internally to Bits UI `Content`.
- Some low-level Bits UI parts may not be exported if COSS does not expose a useful equivalent.

### Later Work

- Decide whether `Popup` and `Content` aliases should both exist.
- Add migration notes from COSS React usage to coss-svelte usage.
- Build API comparison tables for every component.
- Add compatibility aliases only where they do not make the API confusing.

## P02: Styling And Token Parity

### v0.1 Decision

Use shadcn-svelte-style `cn-*` placeholder classes in source components and resolve them into real Tailwind v4 classes during registry generation.

### Why This Decision

COSS is visually dense and variant-heavy. Hard-coding all classes directly in every component would make the source noisy and harder to maintain. A placeholder strategy keeps source components clean while still allowing copy-and-own registry output.

### 90% Coverage

- One default COSS-like style.
- Semantic CSS variables for color, radius, typography, density, and motion.
- `tailwind-variants` for real component variants.
- Stable `data-slot` selectors for styling and tests.
- Package users can import theme CSS.
- Registry users can receive resolved Tailwind classes.

### Gap To 100%

- No multiple style presets in v0.1.
- No exhaustive pixel-perfect parity pass against coss.com yet.
- No complete visual regression suite for every particle and state.
- Some exact COSS internals may be approximated where they depend on React/Base UI generated DOM.

### Later Work

- Add pixel comparison against COSS reference pages.
- Add a full visual regression matrix for variants, states, density, and dark mode.
- Add support for additional style presets only if there is real demand.
- Add automated validation that every placeholder class has a style-map entry.

## P03: Form Parity

### v0.1 Decision

Use a native-first `Form`, `Field`, and `Fieldset` architecture. Keep validation framework integrations as examples instead of core dependencies.

### Why This Decision

Forms are app architecture, not just UI. SvelteKit users may choose native actions, `use:enhance`, Superforms, formsnap, Felte, Zod, Valibot, or custom validation. Core components should own accessibility and presentation, not force a form stack.

### 90% Coverage

- `Field` handles label, description, error, invalid, disabled, required, and ARIA wiring.
- `Form` is a thin native `<form>` wrapper.
- Native `name`, `value`, `required`, and `disabled` behavior works.
- SvelteKit `use:enhance` and validation examples can be documented.

### Gap To 100%

- No clone of Base UI `onFormSubmit` object parsing.
- No built-in Superforms/formsnap adapter in core.
- No universal validation state manager.
- No automatic object serialization for every complex component.

### Later Work

- Add optional Superforms/formsnap examples.
- Add optional Zod and Valibot recipes.
- Add form serialization tests for Select, Combobox, Date Picker, Checkbox Group, Radio Group, and OTP Field.
- Decide whether a separate `@coss-svelte/forms` adapter package is worthwhile.

## P04: Registry And CLI Parity

### v0.1 Decision

Use a hybrid architecture, but build package-first. Keep registry metadata from the beginning and defer the CLI until the first stable components prove the shape.

### Why This Decision

COSS and shadcn work because their registry metadata is reliable. Building the CLI before component APIs settle would create churn in generated output and installation behavior.

### 90% Coverage

- Components live in package source.
- Metadata records dependencies, files, categories, and status.
- Docs can import directly from source.
- Registry generation can begin once the first batch is stable.

### Gap To 100%

- No complete `npx add` install/update flow at first.
- No remote registry hosting guarantee at first.
- No dependency graph migration tooling.
- No automated update diff workflow.

### Later Work

- Build static registry output.
- Build dependency validation.
- Build CLI install flow.
- Add update/check commands if the copy-and-own model proves useful.
- Test registry installs in clean SvelteKit projects.

## P05: Date Picker Parity

### v0.1 Decision

Keep Date Picker in stable scope by wrapping Bits UI `DatePicker` and `DateRangePicker`.

### Why This Decision

Bits UI already owns the hard date picker behavior for Svelte: segments, calendar integration, popover behavior, range support, and controlled state. Rebuilding it from Calendar plus Popover would duplicate a maintained primitive.

### 90% Coverage

- Single-date Date Picker.
- Range Date Picker.
- Svelte bindings for value and open state.
- COSS-like styling.
- Form serialization examples.
- Display formatting examples.

### Gap To 100%

- No arbitrary public support for JS `Date`, ISO string, and formatted string values at first.
- Some COSS Date Picker particles may not map exactly.
- Exact COSS date formatting and shortcut patterns may need follow-up examples.

### Later Work

- Add value conversion helpers if real users need them.
- Add all COSS Date Picker particles that map cleanly.
- Add timezone and locale test cases.
- Add docs for `@internationalized/date` value handling.

## P06: Drawer Parity

### v0.1 Decision

Reduce Drawer to a Dialog-backed edge panel and mark it experimental if shipped early.

### Why This Decision

Full COSS Drawer behavior is not just a styled Dialog. It includes snap points, swipe gestures, nested drawers, responsive drawer/menu patterns, and mobile physics. Bits UI has Dialog but not a Drawer primitive, so full parity would require a custom interaction system.

### 90% Coverage

- Dialog-backed focus management.
- Escape key behavior.
- Outside-click behavior.
- Portal behavior.
- Side and bottom placement.
- Header, body, footer, close, and handle parts.
- Controlled `bind:open`.

### Gap To 100%

- No drag gestures.
- No snap points.
- No nested drawer stack.
- No drawer menu variants.
- No physics-based animation.
- No detailed mobile swipe area tuning.

### Later Work

- Write a dedicated Drawer interaction spec.
- Evaluate Svelte gesture and motion primitives.
- Add mobile viewport tests.
- Add scroll lock and nested focus tests.
- Add reduced-motion behavior.
- Promote Drawer from experimental only after the full interaction matrix passes.

## P07: Number Field Parity

### v0.1 Decision

Defer stable Number Field. Use `Input type="number"` with `Field` and `InputGroup` examples until an accessible spinbutton implementation is specified and tested.

### Why This Decision

Number Field looks small, but full behavior is difficult: keyboard support, increment/decrement buttons, min/max/step, locale parsing, formatting, scrub behavior, form serialization, disabled/invalid states, and screen reader semantics.

### 90% Coverage

- Native number input examples.
- Field composition.
- InputGroup composition.
- Browser-native validation.
- Optional step buttons as examples, not a stable custom spinbutton.

### Gap To 100%

- No custom spinbutton component.
- No scrub area.
- No locale-aware formatting.
- No custom parser.
- No advanced keyboard support.
- No wheel, pointer, and press-and-hold increment behavior.

### Later Work

- Write an accessibility spec for the role and keyboard contract.
- Decide whether to build on native input or a custom spinbutton.
- Add min/max/step tests.
- Add locale parsing and formatting tests.
- Add scrub behavior only if it can be made accessible and predictable.

## P08: Toast Parity

### v0.1 Decision

Ship only a basic global Toast if it stays small and passes browser tests. Mark it experimental until then.

### Why This Decision

COSS Toast is a system, not just a visual component. It has providers, global and anchored managers, lifecycle helpers, promise helpers, dedupe/upsert behavior, and swipe interactions. Bits UI does not provide a Toast primitive.

### 90% Coverage

- `ToastProvider`.
- `ToastViewport`.
- `ToastRoot`, `ToastTitle`, `ToastDescription`, `ToastAction`, and `ToastClose`.
- Basic `toastManager.add`, `toastManager.update`, and `toastManager.dismiss`.
- Auto-dismiss if tested.

### Gap To 100%

- No anchored toast providers.
- No promise helper API.
- No dedupe/upsert semantics.
- No swipe gestures.
- No multiple viewport manager system.
- No full lifecycle parity.

### Later Work

- Write a Toast manager spec.
- Add viewport and provider lifecycle tests.
- Add action focus behavior tests.
- Add pause-on-hover and reduced-motion tests.
- Add anchored toasts only after the global model is stable.
- Add promise helpers after update/dismiss semantics are proven.

## P09: Particle Parity

### v0.1 Decision

Port 1 to 3 high-signal particles per stable component first. Full particle parity is post-stable.

### Why This Decision

COSS has hundreds of particles. Porting all of them before the component APIs settle would slow implementation and create churn. MVP particles should prove the component API, real composition, and visual language.

### 90% Coverage

- Default particle per stable component.
- One composition particle where relevant.
- One advanced COSS-like pattern where it validates API shape.
- Hand-authored examples for components with no upstream particles.

### Gap To 100%

- Not every visual variation is ported.
- Examples that require deferred Drawer, Toast, or Number Field behavior are skipped.
- Exact particle catalog structure may not match COSS yet.
- No guarantee that every COSS particle has a Svelte counterpart.

### Later Work

- Add `particlePriority` metadata.
- Build a particle parity tracker.
- Port later-tier particles by component family.
- Mark unsupported particles with reasons.
- Add visual tests for every MVP particle before expanding the catalog.

## P10: Verification Parity

### v0.1 Decision

Use component-family verification gates rather than one generic checklist.

### Why This Decision

Different components fail in different ways. A Button needs variant and semantic checks. Select needs keyboard and form serialization checks. Dialog needs focus restoration and portal checks. Drawer, Toast, and Number Field need interaction tests before they can be stable.

### 90% Coverage

- `pnpm biome:ci`.
- `pnpm check`.
- SSR smoke tests.
- Hydration smoke tests.
- Keyboard smoke tests where focusable elements exist.
- Component-family tests for presentational, Bits-backed, compound, and custom components.

### Gap To 100%

- No exhaustive browser/device matrix at first.
- No full visual regression against coss.com at first.
- No complete assistive-technology manual test matrix at first.
- No full mobile gesture coverage until Drawer and Toast are ready.

### Later Work

- Add Playwright component interaction tests.
- Add visual regression tests after the docs examples stabilize.
- Add axe checks where useful.
- Add mobile viewport suites.
- Add per-component acceptance checklists in implementation tickets.

## P11: Exact Visual Parity

### v0.1 Decision

Target COSS visual language, not pixel-perfect parity.

### Why This Decision

Svelte/Bits UI output will not always produce the same DOM as React/Base UI. Exact pixels can also become a trap if they require brittle selectors or one-off CSS to hide structural differences.

### 90% Coverage

- Same product UI tone.
- Same density direction.
- Same token family.
- Same component silhouettes.
- Same broad variants and states.

### Gap To 100%

- Exact dimensions may differ.
- Exact animation curves may differ.
- Exact internal DOM selectors may differ.
- Exact COSS website screenshots may not match.

### Later Work

- Create COSS reference screenshots.
- Add screenshot comparison once docs examples are stable.
- Decide acceptable pixel thresholds.
- Track intentional visual differences in docs.

## P12: Ecosystem Integration Parity

### v0.1 Decision

Keep the core package clean and minimal. Add integrations as docs and optional examples first.

### Why This Decision

The value of coss-svelte is a clean initial design system for SvelteKit. Hard dependencies on app-level libraries would make it less generally useful.

### 90% Coverage

- SvelteKit docs.
- Vite package compatibility.
- Native forms.
- Bits UI primitives.
- Tailwind v4 theme.
- Biome-only linting and formatting.

### Gap To 100%

- No dedicated adapters for every SvelteKit form stack.
- No router-specific pagination/link adapters beyond examples.
- No Storybook-style docs pipeline unless selected later.
- No complete install automation.

### Later Work

- Add optional adapter recipes.
- Add clean SvelteKit starter examples.
- Test package use in a fresh SvelteKit app.
- Test registry install use in a fresh SvelteKit app.

## Priority For Later Implementation

The recommended order for closing the 90% to 100% gap is:

1. Registry generation and install validation.
2. Visual regression for the stable component set.
3. Full particle parity tracking.
4. Toast global manager stabilization.
5. Drawer interaction spike.
6. Number Field accessibility spike.
7. CLI install/update workflow.
8. Advanced form adapters.
9. Exact pixel parity pass against COSS references.

This order keeps the foundation stable before adding the riskiest custom interactions.
