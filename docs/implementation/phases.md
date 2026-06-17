# Implementation Phases

This file sequences the v0.1 implementation work.

Read [v0.1 Scope Decisions](./v0.1-scope-decisions.md) before changing scope. Read [Decision Records](./decision-records.md) before changing API, styling, forms, registry, particle, or verification decisions. Deferred parity work lives in [Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md).

## Phase Status

| Phase | Status | Notes |
| --- | --- | --- |
| Phase 0: Contracts | Implemented for the current pass. | API, styling pipeline, metadata, and Biome-only tooling are represented in package files and docs. |
| Phase 1: Low-Risk Presentational Components | Implemented for the current pass. | Native/presentational components exist and are covered by the demo app. |
| Phase 2: Direct Bits UI Wrappers | Implemented for the current pass. | Direct primitive wrappers exist for the stable Bits-backed set. |
| Phase 3: Compound Components | Mostly implemented for the current pass. | Stable compound components exist; known parity gaps are tracked separately. |
| Phase 4: High-Risk Design Spikes | Partial / experimental. | Drawer, Sidebar, and Toast remain experimental; Number Field is deferred. |
| Phase 5: Registry, Particles, and Docs | Partial. | Registry output exists; full particle parity and install CLI are post-v0.1. |

## Phase 0: Contracts

- Define token names, CSS variable contract, radius/density scale, and typography.
- Use the `cn-*` placeholder-class build strategy from [ADR-002](./decision-records.md#adr-002-styling-tokens-and-build-pipeline).
- Define component metadata schema for registry items, particles, dependencies, and docs.
- Define Svelte export conventions and naming aliases from [ADR-001](./decision-records.md#adr-001-public-api-and-naming).

## Phase 1: Low-Risk Presentational Components

Start with components that do not depend on complex focus, keyboard, or portal behavior:

- Button
- Badge
- Card
- Input
- Textarea
- Label
- Separator
- Kbd
- Skeleton
- Spinner
- Alert
- Empty
- Table
- Breadcrumb
- Group
- Frame

## Phase 2: Direct Bits UI Wrappers

Implement primitives with close Bits UI equivalents:

- Accordion
- Alert Dialog
- Avatar
- Calendar
- Checkbox
- Collapsible
- Dialog
- Label
- Meter
- OTP Field
- Pagination
- Popover
- Preview Card
- Progress
- Radio Group
- Scroll Area
- Select
- Slider
- Switch
- Tabs
- Toggle
- Toggle Group
- Toolbar
- Tooltip

## Phase 3: Compound Components

Implement components that compose multiple primitives or add meaningful state layers:

- Autocomplete
- Checkbox Group
- Combobox
- Command
- Date Picker
- Field
- Fieldset
- Form
- Input Group
- Menu
- Sheet
- Sidebar, only after app-shell layout behavior is resolved

## Phase 4: High-Risk Design Spikes

Run design and verification spikes for components without a clean direct Bits UI equivalent:

- Drawer, reduced Dialog-backed version can ship as experimental if tested
- Number Field, deferred from stable v0.1 until the accessibility contract is written
- Toast, basic global manager can ship as experimental if tested

These require deeper accessibility and interaction testing before they can be marked stable. Track skipped behavior in [Unimplemented Components And Parity Gaps](./unimplemented-components.md).

## Phase 5: Registry, Particles, and Docs

- Generate registry JSON from component metadata.
- Port 1 to 3 MVP COSS particles per stable component.
- Build `apps/www` component docs from the registry and markdown metadata.
- Track full particle parity in [Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md).
- Add visual regression tests only after examples are stable.
