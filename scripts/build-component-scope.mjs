import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const scopeDir = path.join(root, "docs", "scope");
const sourceIndex = path.join(scopeDir, "source", "00-component-index.md");

const slugify = (value) =>
	value
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const componentRows = fs
	.readFileSync(sourceIndex, "utf8")
	.split("\n")
	.filter((line) => line.startsWith("| ") && !line.includes("---"))
	.map((line) => {
		const cells = line
			.split("|")
			.slice(1, -1)
			.map((cell) => cell.trim());
		const docsMatch = cells[5]?.match(/\(([^)]+)\)/);
		return {
			name: cells[0],
			slug: slugify(cells[0]),
			category: cells[1],
			scope: cells[2],
			particles: Number(cells[3] ?? 0),
			localPrimitiveRef: cells[4],
			liveDocs: docsMatch?.[1] ?? "",
		};
	})
	.filter((component) => component.name !== "Component");

const foundation = {
	accordion: {
		bits: "Accordion",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Accordion parts with COSS-compatible item, trigger, and content styling; preserve array-style value handling and collapsible examples.",
	},
	"alert-dialog": {
		bits: "AlertDialog",
		tier: "direct primitive",
		outline:
			"Map COSS Alert Dialog sections onto Bits UI AlertDialog root, trigger, portal, overlay, content, title, description, action, and cancel parts.",
	},
	alert: {
		bits: "native markup",
		tier: "presentational",
		outline:
			"Implement as styled region/callout primitives with variant classes, icon slot support, title, description, and accessible role guidance.",
	},
	autocomplete: {
		bits: "Combobox",
		tier: "compound primitive",
		outline:
			"Build an autocomplete wrapper around Bits UI Combobox with input-first filtering, item rendering, empty state, grouped options, and form field composition.",
	},
	avatar: {
		bits: "Avatar",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Avatar image/fallback parts and add COSS sizing, grouping, stacked avatar, status, and image fallback patterns.",
	},
	badge: {
		bits: "native markup",
		tier: "presentational",
		outline:
			"Implement span/a/button-compatible badge variants with semantic color tokens, compact sizing, icon slots, and removable badge examples.",
	},
	breadcrumb: {
		bits: "native nav",
		tier: "presentational",
		outline:
			"Use nav/ol/li markup with separators, ellipsis, current page semantics, truncation behavior, and optional menu-backed overflow.",
	},
	button: {
		bits: "native button/link",
		tier: "presentational",
		outline:
			"Define Button and buttonVariants using tailwind-variants; support native button and link rendering, icon sizes, loading state, and button-group data styling.",
	},
	calendar: {
		bits: "Calendar / RangeCalendar",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Calendar and RangeCalendar with COSS month grid styling, navigation controls, range/multiple modes, disabled dates, and locale-aware examples.",
	},
	card: {
		bits: "native markup",
		tier: "presentational",
		outline:
			"Create Card root/header/title/description/content/footer sections with data-slot styling and dense product UI examples.",
	},
	checkbox: {
		bits: "Checkbox",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Checkbox root/indicator, add icon rendering, invalid/disabled states, Field integration, and row/card checkbox particle patterns.",
	},
	"checkbox-group": {
		bits: "Checkbox + custom group",
		tier: "compound primitive",
		outline:
			"Compose Checkbox with group-level value management, Fieldset semantics, validation messages, and horizontal/vertical option layouts.",
	},
	collapsible: {
		bits: "Collapsible",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Collapsible with trigger/content exports, animation data attributes, and simple disclosure examples.",
	},
	combobox: {
		bits: "Combobox",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Combobox with trigger/input/content/item exports, object value handling, async examples, multi-select patterns, and Field integration.",
	},
	command: {
		bits: "Command + Dialog",
		tier: "compound primitive",
		outline:
			"Compose Bits UI Command with Dialog for palette use, define groups/items/shortcuts, and keep keyboard navigation and filtering behavior native.",
	},
	"date-picker": {
		bits: "DatePicker / DateRangePicker",
		tier: "compound primitive",
		outline:
			"Prefer Bits UI DatePicker where it matches COSS; otherwise compose Popover, Button, and Calendar with formatter, range, and form examples.",
	},
	dialog: {
		bits: "Dialog",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Dialog root, trigger, portal, overlay, content, close, title, and description; add COSS header, panel, footer, and scroll behavior.",
	},
	drawer: {
		bits: "Dialog accessibility shell + custom motion",
		tier: "custom compound",
		outline:
			"Start from Dialog semantics for focus/portal/escape handling, then layer edge placement, drag/snap behavior, nested drawers, and responsive dialog-drawer switching.",
	},
	empty: {
		bits: "native markup",
		tier: "presentational",
		outline:
			"Build Empty root/icon/title/description/actions sections for product empty states with compact and illustrated variants.",
	},
	field: {
		bits: "Label + native semantics",
		tier: "compound primitive",
		outline:
			"Create Field root, label, description, error, and control conventions with aria-describedby wiring and invalid/required data attributes.",
	},
	fieldset: {
		bits: "native fieldset",
		tier: "presentational",
		outline:
			"Wrap fieldset/legend semantics with Field-compatible description and error slots for grouped controls.",
	},
	form: {
		bits: "native form",
		tier: "integration layer",
		outline:
			"Keep framework-agnostic form sections first; add SvelteKit enhance examples and optional validation adapters without hard-coding a form library.",
	},
	frame: {
		bits: "native markup",
		tier: "presentational",
		outline:
			"Implement framed preview/media containers with aspect constraints, subtle borders, loading/error slots, and code-preview use cases.",
	},
	group: {
		bits: "native markup",
		tier: "presentational",
		outline:
			"Create grouping primitives for attached controls, segmented surfaces, and density-consistent product layouts using data-slot selectors.",
	},
	input: {
		bits: "native input",
		tier: "presentational",
		outline:
			"Implement styled input with sizing, invalid/disabled states, file input handling, leading/trailing icon compatibility, and Field integration.",
	},
	"input-group": {
		bits: "native markup",
		tier: "compound primitive",
		outline:
			"Build strict-order addons, controls, buttons, textareas, and prefix/suffix composition with layout invariants documented in examples.",
	},
	kbd: {
		bits: "native kbd",
		tier: "presentational",
		outline:
			"Style keyboard shortcut tokens with compact sizing, command-key normalization examples, and inline/list usage.",
	},
	label: {
		bits: "Label",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Label with consistent typography, disabled state propagation, and Field-compatible usage.",
	},
	menu: {
		bits: "DropdownMenu / ContextMenu / Menu",
		tier: "compound primitive",
		outline:
			"Map COSS Menu exports to Bits UI menu primitives, covering trigger, popup, item, checkbox/radio items, submenus, separators, labels, and shortcuts.",
	},
	meter: {
		bits: "Meter",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Meter with value/label exports, thresholds, color states, and compact status examples.",
	},
	"number-field": {
		bits: "custom spinbutton",
		tier: "custom primitive",
		outline:
			"Implement an accessible spinbutton-style input with increment/decrement controls, min/max/step, formatting hooks, and Field integration.",
	},
	"otp-field": {
		bits: "PinInput",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI PinInput as OTPField with one input per character, separators, grouped layouts, paste handling, and verification form examples.",
	},
	pagination: {
		bits: "Pagination",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Pagination with previous/next/items/ellipsis exports and routing-friendly link rendering for SvelteKit.",
	},
	popover: {
		bits: "Popover",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Popover with trigger/content/arrow exports, portal forwarding, collision options, and form/filter examples.",
	},
	"preview-card": {
		bits: "LinkPreview",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI LinkPreview with trigger/content exports and rich preview card styling for links, users, and resources.",
	},
	progress: {
		bits: "Progress",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Progress with determinate/indeterminate styling, labels, stacked examples, and semantic value text.",
	},
	"radio-group": {
		bits: "RadioGroup",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI RadioGroup with item/indicator exports, card options, Fieldset composition, and keyboard testing.",
	},
	"scroll-area": {
		bits: "ScrollArea",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI ScrollArea with viewport/scrollbar/thumb exports and table, menu, and long-content examples.",
	},
	select: {
		bits: "Select",
		tier: "direct primitive",
		outline:
			"Map COSS items-first Select patterns to Bits UI Select with trigger/value/content/item/group/label exports, object values, multiple mode, and form serialization.",
	},
	separator: {
		bits: "Separator",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Separator with orientation variants, decorative semantics, and menu/card separation examples.",
	},
	sheet: {
		bits: "Dialog",
		tier: "compound primitive",
		outline:
			"Compose Dialog with side placement classes, overlay/content exports, responsive widths, and close behavior matching COSS Sheet.",
	},
	sidebar: {
		bits: "Collapsible + native navigation",
		tier: "compound primitive",
		outline:
			"Build app-shell sidebar primitives around nav markup, collapsible groups, controlled collapsed state, responsive drawer mode, and persistent layout tokens.",
	},
	skeleton: {
		bits: "native markup",
		tier: "presentational",
		outline:
			"Implement animated placeholder blocks with shape variants, reduced-motion handling, and page/card/table skeleton examples.",
	},
	slider: {
		bits: "Slider",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Slider with thumb/range/track exports, scalar and range modes, value labels, marks, and Field integration.",
	},
	spinner: {
		bits: "native SVG/CSS",
		tier: "presentational",
		outline:
			"Create accessible loading indicator variants with size, label, reduced-motion, and button/input loading composition examples.",
	},
	switch: {
		bits: "Switch",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Switch with thumb styling, labels, Field composition, and settings-row particle patterns.",
	},
	table: {
		bits: "native table",
		tier: "presentational",
		outline:
			"Implement table section components with responsive overflow wrapper, density variants, numeric alignment, empty rows, and toolbar integration.",
	},
	tabs: {
		bits: "Tabs",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Tabs list/trigger/content with variant styling, orientation support, and dashboard/settings examples.",
	},
	textarea: {
		bits: "native textarea",
		tier: "presentational",
		outline:
			"Implement styled textarea with autosize guidance, invalid/disabled states, InputGroup compatibility, and Field integration.",
	},
	toast: {
		bits: "custom store + portal",
		tier: "custom compound",
		outline:
			"Build a Svelte toast manager with provider, viewport, toast root/title/description/action/close, swipe/dismiss behavior, and promise/update helpers.",
	},
	toggle: {
		bits: "Toggle",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Toggle with button variants, pressed state styling, icon-only accessibility, and toolbar examples.",
	},
	"toggle-group": {
		bits: "ToggleGroup",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI ToggleGroup with single/multiple modes, roving focus, item variants, and segmented-control examples.",
	},
	toolbar: {
		bits: "Toolbar",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Toolbar with group/separator/button composition, roving focus, and editor/action-bar examples.",
	},
	tooltip: {
		bits: "Tooltip",
		tier: "direct primitive",
		outline:
			"Wrap Bits UI Tooltip provider/root/trigger/content/arrow with delay, side/align options, and icon-button guidance.",
	},
};

function entryFor(component) {
	return (
		foundation[component.slug] ?? {
			bits: "needs research",
			tier: "unknown",
			outline:
				"Confirm the closest Bits UI primitive or native Svelte implementation path before coding.",
		}
	);
}

const matrix = `# Component Implementation Matrix

Generated from the COSS scope inventory. This table is the first implementation planning surface for coss-svelte.

| Component | Category | Foundation | Tier | First implementation pass |
|---|---|---|---|---|
${componentRows
	.map((component) => {
		const entry = entryFor(component);
		return `| [${component.name}](#${slugify(component.name)}) | ${component.category} | ${entry.bits} | ${entry.tier} | ${entry.outline} |`;
	})
	.join("\n")}
`;

const sections = componentRows
	.map((component) => {
		const entry = entryFor(component);
		return `## ${component.name}

- Category: ${component.category}
- COSS scope: ${component.scope}
- COSS docs: ${component.liveDocs}
- Particle examples: ${component.particles}
- Svelte foundation: ${entry.bits}
- Implementation tier: ${entry.tier}

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. ${entry.outline}
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: ${component.localPrimitiveRef}
- COSS live docs: ${component.liveDocs || "not found"}
`;
	})
	.join("\n");

const outline = `# Component Implementation Outline

This document expands the feature scope into implementation intent for each component. It is not component code.

The implementation strategy is to preserve COSS's visual language and copy-and-own ergonomics, while replacing the React/Base UI primitive layer with Svelte-native Bits UI or native Svelte markup.

${sections}
`;

const readme = `# Scope Documentation

This directory contains the coss-svelte component scope and implementation outline.

## Generated Planning Files

- [Component Implementation Matrix](component-implementation-matrix.md)
- [Component Implementation Outline](component-implementation-outline.md)

## Source Scope Files

The source directory contains the original COSS component scope inventory generated before this repository was created. Treat it as source material, not the current coss-svelte implementation plan.

## Implementation Principle

Do not port Base UI directly. Port the component contract, visual tokens, examples, and documentation shape onto Svelte-native foundations, primarily Bits UI.
`;

fs.writeFileSync(path.join(scopeDir, "README.md"), readme);
fs.writeFileSync(path.join(scopeDir, "component-implementation-matrix.md"), matrix);
fs.writeFileSync(path.join(scopeDir, "component-implementation-outline.md"), outline);

console.log(`Wrote ${componentRows.length} component outlines.`);
