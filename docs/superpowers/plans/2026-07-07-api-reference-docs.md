# API Reference Docs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current metadata-card API section with a COSS-style API reference that describes every documented Svelte root component and part, with concise role text and prop tables.

**Architecture:** Keep the API reference as structured docs data, not embedded markup. `navigation.js`, the rendered component page, and raw Markdown generation should all read the same catalog so HTML docs, Copy Markdown, and `/docs/components/*.md` stay in sync.

**Tech Stack:** SvelteKit, Svelte 5, Node test runner, local `coss-svelte` metadata, Tailwind CSS 4 utility classes.

---

## Current State

- Public COSS UI renders `API Reference` as one section per exported element: `### ElementName`, one concise role sentence, then a prop/type/default/description table.
- Local `coss-svelte` currently renders `API Reference` as four cards: Status, Foundation, Category, and Particles.
- Local raw Markdown has the same limitation, so agents reading `/docs/components/autocomplete.md` do not get element roles or prop details.
- The COSS React API cannot be copied directly. Local Svelte components expose different props, for example `Autocomplete` uses `options`, `placeholder`, bindable `value`, and bindable `open`, while COSS React documents Base UI/React props.

## Scope Decisions

- Treat "all elements" as every root component page plus every exported part in `componentParts`. Current inventory is 54 roots, 203 parts, 257 documented elements total.
- Use COSS UI as the visual and information-architecture model, not as the prop source of truth.
- Document Svelte-facing props, including bindable props, local convenience props, `class`, and passthrough `...rest` where useful.
- Move Status/Foundation/Category/Particles out of the primary API reference. Keep them as a compact `Implementation Details` block or fold them into the existing `Status` section.
- Do not infer polished prose automatically. Tests can detect missing entries and prop drift, but descriptions should be hand-authored so they stay useful.
- Defer visual screenshot automation unless the repo later adds Playwright. The current test suite is mostly static Node tests, so this plan follows that pattern.

## Files and Responsibilities

- Create `apps/www/src/lib/docs/api-reference.js`: structured API reference source of truth.
- Modify `apps/www/src/lib/docs/navigation.js`: attach API reference data to each component doc page.
- Create `apps/www/src/lib/components/docs/component-api-reference.svelte`: present COSS-style element sections and prop tables.
- Modify `apps/www/src/lib/components/docs/component-doc-page.svelte`: replace API cards with the new renderer and relocate implementation facts.
- Modify `apps/www/src/lib/docs/markdown.js`: emit the same API reference as Markdown headings and tables.
- Create `tests/api-reference.test.mjs`: coverage, shape, and prop-drift tests.
- Modify `tests/agent-docs.test.mjs`: assert component Markdown includes the richer API reference.
- Optional follow-up: update `packages/coss-svelte/src/index.d.ts` only if the implementation decides to export API-reference types publicly. Prefer JSDoc in `api-reference.js` for this iteration.

## Data Model

Use a component-keyed catalog where the element order matches the rendered page:

```js
/**
 * @typedef {{
 *   name: string;
 *   type: string;
 *   default?: string;
 *   description: string;
 * }} ApiProp
 *
 * @typedef {{
 *   name: string;
 *   description: string;
 *   props?: ApiProp[];
 * }} ApiElement
 *
 * @typedef {Record<string, ApiElement[]>} ComponentApiReference
 */

export const componentApiReference = {
	Autocomplete: [
		{
			name: "Autocomplete",
			description: "Coordinates autocomplete value, popup state, options, and child parts.",
			props: [
				{
					name: "options",
					type: "Array<string | { value?: unknown; label?: string; disabled?: boolean }>",
					default: "[]",
					description: "Options rendered by the built-in fallback composition.",
				},
				{
					name: "value",
					type: "string",
					default: "\"\"",
					description: "Selected value. Bind with `bind:value`.",
				},
				{
					name: "open",
					type: "boolean",
					default: "false",
					description: "Popup visibility. Bind with `bind:open`.",
				},
				{
					name: "...rest",
					type: "Combobox root props",
					description: "Additional props forwarded to the Bits UI combobox root.",
				},
			],
		},
		{
			name: "AutocompleteInput",
			description: "Renders the search input and optional popup trigger control.",
			props: [
				{
					name: "showTrigger",
					type: "boolean",
					default: "false",
					description: "Shows a trigger button beside the input.",
				},
				{
					name: "triggerProps",
					type: "Record<string, unknown>",
					default: "{}",
					description: "Props forwarded to the optional trigger button.",
				},
				{
					name: "class",
					type: "string",
					default: "\"\"",
					description: "Additional classes for the input.",
				},
				{
					name: "...rest",
					type: "Input props",
					description: "Additional props forwarded to the Bits UI input.",
				},
			],
		},
	],
};

export function getComponentApiReference(name) {
	return componentApiReference[name] ?? [];
}
```

The Autocomplete content above is an implementation starter, not the whole catalog. The complete implementation must add every root and part covered by `componentParts`.

## Task 1: Add Failing API Coverage Tests

- [ ] Create `tests/api-reference.test.mjs`.
- [ ] Import `componentMetadata` and `componentParts` from `packages/coss-svelte/src/metadata.js`.
- [ ] Import `componentApiReference` from `apps/www/src/lib/docs/api-reference.js`.
- [ ] Assert every component has entries exactly matching `[rootName, ...parts]` in order.
- [ ] Assert every entry has a non-empty `description`, no duplicate element names, and no placeholder prose such as `TODO`, `TBD`, `description`, or `props`.
- [ ] Assert every prop row has `name`, `type`, and `description`.
- [ ] Add a simple source extractor that reads `packages/coss-svelte/src/components/<Element>.svelte`, finds destructured `$props()` names, ignores `children`, internal aliases, and `...rest`, and verifies each public custom prop appears in the matching API table.
- [ ] Run:

```bash
cd coss-svelte
node --test tests/api-reference.test.mjs
```

Expected result: FAIL because `api-reference.js` does not exist yet.

## Task 2: Create the API Reference Catalog

- [ ] Create `apps/www/src/lib/docs/api-reference.js` with the typedefs, `componentApiReference`, and `getComponentApiReference(name)`.
- [ ] Add entries for all 257 documented elements.
- [ ] For most part components, use concise role descriptions and a small prop table:
  - `class`: "Additional classes for the rendered element."
  - `...rest`: "Additional props forwarded to the underlying element or Bits UI primitive."
- [ ] For root and higher-level components, document the meaningful local props from `$props()`, especially bindable props such as `open`, `value`, `checked`, `pressed`, `page`, and `indeterminate`.
- [ ] For deferred `NumberField`, add a root entry that states the component is deferred and has no implemented Svelte API yet.
- [ ] Run:

```bash
cd coss-svelte
node --test tests/api-reference.test.mjs
```

Expected result: PASS.

## Task 3: Wire API Data into Navigation

- [ ] Modify `apps/www/src/lib/docs/navigation.js`.
- [ ] Import `getComponentApiReference`.
- [ ] Add `apiReference: getComponentApiReference(name)` to each `componentDocs` item.
- [ ] Keep the existing `imports`, `parts`, `statusLabel`, and local `href` behavior unchanged.
- [ ] Run:

```bash
cd coss-svelte
node --test tests/component-scope.test.mjs tests/header-search.test.mjs tests/api-reference.test.mjs
```

Expected result: all selected tests pass.

## Task 4: Render COSS-Style API Tables

- [ ] Create `apps/www/src/lib/components/docs/component-api-reference.svelte`.
- [ ] Render each API element as:
  - `<h3>` with the element name.
  - one muted paragraph with the role description.
  - a table only when `props.length > 0`.
- [ ] Use table columns `Prop`, `Type`, optional `Default`, and `Description`.
- [ ] Render prop names, types, and defaults as inline code pills matching the COSS reference feel.
- [ ] Wrap tables in horizontal overflow containers so long Svelte/Bits UI types do not break mobile layout.
- [ ] Avoid card grids inside the API reference. The visual rhythm should be headings, prose, and bordered table rows.

## Task 5: Replace the Component Page API Section

- [ ] Modify `apps/www/src/lib/components/docs/component-doc-page.svelte`.
- [ ] Import `ComponentApiReference`.
- [ ] Extend the local `ComponentPage` type with `apiReference`.
- [ ] Replace the Status/Foundation/Category/Particles card grid inside `#api-reference` with:

```svelte
<ComponentApiReference reference={page.apiReference} />
```

- [ ] Add a compact `Implementation Details` section after API Reference, or expand the existing `Status` section, to preserve:
  - Status
  - Foundation
  - Category
  - Particles
- [ ] Update `getPageToc(page)` in `navigation.js` if a new `#implementation-details` anchor is introduced.
- [ ] Run:

```bash
cd coss-svelte
pnpm --filter @coss-svelte/www check
node --test tests/design-polish.test.mjs tests/api-reference.test.mjs
```

Expected result: Svelte check and selected tests pass.

## Task 6: Update Raw Markdown and Copy Markdown

- [ ] Modify `apps/www/src/lib/docs/markdown.js`.
- [ ] Extend the `ComponentDoc` typedef with `apiReference`.
- [ ] Replace the metadata bullets currently under `## API Reference` with generated Markdown:
  - `### ElementName`
  - role sentence
  - Markdown prop table when props exist
- [ ] Add a separate `## Implementation Details` section for Status/Foundation/Category/Particles.
- [ ] Escape pipe characters in type strings before writing Markdown tables.
- [ ] Run:

```bash
cd coss-svelte
curl -sS http://127.0.0.1:5173/docs/components/autocomplete.md | sed -n '/## API Reference/,/## Implementation Details/p'
```

Expected result: the output includes `### Autocomplete`, `### AutocompleteInput`, prop table rows, and concise descriptions.

## Task 7: Strengthen Agent Docs Tests

- [ ] Modify `tests/agent-docs.test.mjs`.
- [ ] Assert `createComponentMarkdown(getComponentDoc("autocomplete"))` includes:
  - `### Autocomplete`
  - `### AutocompleteInput`
  - `| Prop | Type |`
  - `options`
  - `showTrigger`
  - `## Implementation Details`
- [ ] Keep the existing install, usage, anatomy, status, and foundation assertions, updating section names if needed.
- [ ] Run:

```bash
cd coss-svelte
node --test tests/agent-docs.test.mjs tests/api-reference.test.mjs
```

Expected result: both tests pass.

## Task 8: Content Review Pass

- [ ] Review the API catalog by category, not alphabetically, to keep language consistent:
  - Selection/Input: Autocomplete, Combobox, Select, Checkbox, RadioGroup, Slider, Switch, Toggle, ToggleGroup.
  - Forms: Field, Fieldset, Form, Input, InputGroup, Label, Textarea, OTPField, DatePicker, Calendar.
  - Overlays: AlertDialog, Dialog, Drawer, Menu, Popover, PreviewCard, Sheet, Tooltip.
  - Layout/Navigation: Accordion, Breadcrumb, Card, Empty, Frame, Group, Pagination, ScrollArea, Sidebar, Table, Tabs, Toolbar.
  - Feedback/Display: Alert, Avatar, Badge, Kbd, Meter, Progress, Separator, Skeleton, Spinner, Toast.
- [ ] Normalize repeated descriptions:
  - `Title` parts name a surface or section.
  - `Description` parts provide supporting copy.
  - `Trigger` parts open, close, or select related content.
  - `Popup` parts render floating or modal content.
  - `Group` parts collect related items.
  - `Separator` parts visually divide related content.
- [ ] Check that descriptions explain what the element is used for, not just what tag it renders.

## Task 9: Full Verification

- [ ] Run the full repo verification:

```bash
cd coss-svelte
pnpm check
pnpm test
```

Expected result: both commands pass.

- [ ] With the local dev server running, inspect:

```bash
open http://127.0.0.1:5173/docs/components/autocomplete
open http://127.0.0.1:5173/docs/components/autocomplete.md
```

Expected result: the HTML page visually matches the COSS-style API reference structure, and the Markdown page contains the same API content.

## Maintenance Rules

- When adding a component or part to `componentParts`, add the corresponding API element entry in the same change.
- When adding a named `$props()` field to a component, update that element's prop table in the same change.
- Keep descriptions one sentence unless the element has genuinely surprising behavior.
- Prefer Svelte/Bits UI wording over React/Base UI wording.
- Do not copy upstream COSS prop tables unless the local Svelte component actually exposes the same API.
