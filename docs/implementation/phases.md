# Implementation Phases

This is the recommended order once implementation begins.

## Phase 0: Contracts

- Define token names, CSS variable contract, radius/density scale, and typography.
- Decide whether to use shadcn-svelte's `cn-*` placeholder-class build strategy.
- Define component metadata schema for registry items, particles, dependencies, and docs.
- Define Svelte export conventions and naming aliases.

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
- Sidebar

## Phase 4: Custom High-Risk Components

Implement components without a clean direct Bits UI equivalent:

- Drawer
- Number Field
- Toast

These require deeper accessibility and interaction testing before being marked stable.

## Phase 5: Registry, Particles, and Docs

- Generate registry JSON from component metadata.
- Port COSS particles as Svelte examples.
- Build `apps/www` component docs from the registry and markdown metadata.
- Add visual regression tests only after examples are stable.
