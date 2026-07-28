# Post-v0.1 Parity Backlog

This document tracks deliberate gaps between the first public `coss-svelte`
release and broader COSS parity. It is a current roadmap, not a record of the
initial implementation sequence.

Read this with [v0.1 Scope Decisions](./v0.1-scope-decisions.md) and
[Decision Records](./decision-records.md). Concrete limitations of the current
surface live in
[Unimplemented Components And Parity Gaps](./unimplemented-components.md).

## Current Foundation

The repository already has:

- generated component declarations and external type-consumer checks;
- a publishable package and theme boundary;
- complete generated registry source closure and schema checks;
- a clean SvelteKit consumer fixture;
- one executable local example for every implemented component;
- runtime, SSR, hydration, production-server, Chromium, and accessibility
  checks in the release gate;
- a provider-controlled Sidebar and a basic Toast provider/manager lifecycle.

Do not reopen these as roadmap work unless a current check demonstrates a
regression.

## Active Priorities

| Priority | Area | Current boundary | Work required before promotion |
| --- | --- | --- | --- |
| P1 | Release contract | Package, theme, registry, and docs paths are executable locally. | Decide final names, versions, support matrix, registry support level, hosting, and governance. |
| P1 | Component verification | Representative runtime, SSR, hydration, browser, and axe checks exist. | Expand keyboard, focus, portal, form serialization, mobile, reduced-motion, and assistive-technology coverage by component family. |
| P1 | Experimental components | Drawer, Sidebar, and Toast are exported with explicit experimental metadata. | Close each component's documented interaction gaps and promote it only after focused browser tests. |
| P2 | Visual parity | A reproducible COSS comparison harness exists. | Establish maintained visual regression baselines and record intentional differences. |
| P2 | Particle parity | Each implemented component has one executable local example. | Port additional high-value COSS particles and track unsupported variants with reasons. |
| P2 | Registry ecosystem | Static registry items are complete and clean-consumer tested. | Decide the hosted support promise, then design install/update automation and migration behavior. |
| P3 | Integrations | Core forms remain native-first and package consumption is SvelteKit/Vite tested. | Add optional form recipes, starter templates, and other bundler coverage only when the support policy requires them. |

## Component Spikes

### Drawer

The current experimental component is a Dialog-backed drawer with focus,
Escape, outside-click, portal, placement, controlled-open, and structural-part
behavior.

Remaining work:

- drag gestures and snap points;
- nested drawers and scroll-lock interaction;
- mobile swipe tuning and responsive dialog/drawer recipes;
- reduced-motion behavior and focused mobile browser coverage.

### Sidebar

The current experimental component has provider-owned controlled state,
functional trigger and rail toggles, expanded/collapsed data state, and
compound app-shell parts.

Remaining work:

- persistence and keyboard shortcut policy;
- responsive mobile drawer mode;
- complete collapsed-icon and tooltip behavior;
- layout-token decisions and browser coverage across variants.

### Toast

The current experimental surface has a provider, viewport, basic manager add
flow, dismissible live-region output, bindable open state, and runtime tests.

Remaining work:

- queue and auto-dismiss policy;
- update, dedupe/upsert, and promise helpers;
- pause-on-hover, action-focus, and reduced-motion behavior;
- anchored/multiple viewports and swipe gestures.

### Number Field

Number Field remains deferred. Before implementation:

- define the accessible spinbutton and keyboard contract;
- decide native-input versus custom behavior;
- specify min/max/step, locale parsing, formatting, and serialization;
- add tests for keyboard, pointer, press-and-hold, wheel, and assistive
  technology behavior.

## Cross-Cutting Backlog

- Add Context Menu only as a complete Bits UI-backed family with registry,
  docs, examples, and interaction tests.
- Add a standalone Checkbox Indicator only if a real context API can preserve
  checked and indeterminate semantics.
- Build visual regression around the stable example set before pursuing exact
  pixel parity.
- Add additional style presets only in response to a concrete product need.
- Keep React/Base UI compatibility notes selective; do not distort the
  Svelte-native API merely to copy upstream mechanics.

## Ordering

1. Freeze the first-release contract and finish release-readiness work.
2. Expand stable component-family browser and accessibility coverage.
3. Establish maintained visual regression baselines.
4. Stabilize Toast and Sidebar behavior, then run the Drawer interaction spike.
5. Specify Number Field before implementing it.
6. Expand particles and ecosystem automation after the package and registry
   support promises are stable.

Update this file when priority, product boundary, or promotion criteria change.
Implementation detail belongs in tests, metadata, and component documentation,
not in dated execution plans.
