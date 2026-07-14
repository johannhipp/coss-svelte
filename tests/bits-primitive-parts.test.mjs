import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import { registryItems } from "../packages/registry/src/index.js";

const directPrimitiveParts = {
	Accordion: ["AccordionItem", "AccordionHeader", "AccordionTrigger", "AccordionContent"],
	AlertDialog: [
		"AlertDialogAction",
		"AlertDialogCancel",
		"AlertDialogDescription",
		"AlertDialogPopup",
		"AlertDialogTitle",
		"AlertDialogTrigger",
	],
	Autocomplete: [
		"AutocompleteGroup",
		"AutocompleteGroupLabel",
		"AutocompleteInput",
		"AutocompleteItem",
		"AutocompleteList",
		"AutocompletePopup",
		"AutocompleteSeparator",
	],
	Avatar: ["AvatarFallback", "AvatarImage"],
	Collapsible: ["CollapsibleTrigger", "CollapsibleContent"],
	Combobox: [
		"ComboboxGroup",
		"ComboboxGroupLabel",
		"ComboboxInput",
		"ComboboxItem",
		"ComboboxList",
		"ComboboxPopup",
		"ComboboxSeparator",
		"ComboboxTrigger",
	],
	Command: [
		"CommandDialog",
		"CommandDialogPopup",
		"CommandDialogTrigger",
		"CommandEmpty",
		"CommandGroup",
		"CommandGroupLabel",
		"CommandInput",
		"CommandItem",
		"CommandList",
		"CommandSeparator",
	],
	Dialog: ["DialogClose", "DialogDescription", "DialogPopup", "DialogTitle", "DialogTrigger"],
	Drawer: ["DrawerClose", "DrawerDescription", "DrawerPopup", "DrawerTitle", "DrawerTrigger"],
	Menu: [
		"MenuCheckboxItem",
		"MenuGroup",
		"MenuGroupLabel",
		"MenuItem",
		"MenuPopup",
		"MenuRadioGroup",
		"MenuRadioItem",
		"MenuSeparator",
		"MenuSub",
		"MenuSubPopup",
		"MenuSubTrigger",
		"MenuTrigger",
	],
	OTPField: ["OTPFieldCell"],
	Pagination: ["PaginationNextButton", "PaginationPage", "PaginationPrevButton"],
	Popover: ["PopoverClose", "PopoverPopup", "PopoverTrigger"],
	PreviewCard: ["PreviewCardPopup", "PreviewCardTrigger"],
	RadioGroup: ["RadioGroupItem"],
	ScrollArea: ["ScrollAreaCorner", "ScrollAreaScrollbar", "ScrollAreaThumb", "ScrollAreaViewport"],
	Select: [
		"SelectGroup",
		"SelectGroupLabel",
		"SelectItem",
		"SelectPopup",
		"SelectScrollDownButton",
		"SelectScrollUpButton",
		"SelectTrigger",
		"SelectValue",
		"SelectViewport",
	],
	Sheet: ["SheetClose", "SheetDescription", "SheetPopup", "SheetTitle", "SheetTrigger"],
	Slider: ["SliderRange", "SliderThumb", "SliderThumbLabel", "SliderTick", "SliderTickLabel"],
	Switch: ["SwitchThumb"],
	Tabs: ["TabsList", "TabsTrigger", "TabsContent"],
	ToggleGroup: ["ToggleGroupItem"],
	Tooltip: ["TooltipPopup", "TooltipProvider", "TooltipTrigger"],
	Toolbar: ["ToolbarButton", "ToolbarGroup", "ToolbarGroupItem", "ToolbarLink"],
};

const nativeHelperParts = {
	AlertDialog: ["AlertDialogFooter", "AlertDialogHeader"],
	Autocomplete: ["AutocompleteCollection", "AutocompleteEmpty", "AutocompleteStatus"],
	Combobox: ["ComboboxClear", "ComboboxCollection", "ComboboxEmpty", "ComboboxValue"],
	Command: ["CommandCollection", "CommandFooter", "CommandPanel", "CommandShortcut"],
	Dialog: ["DialogFooter", "DialogHeader", "DialogPanel"],
	Drawer: ["DrawerContent", "DrawerCreateHandle", "DrawerFooter", "DrawerHeader", "DrawerPanel"],
	Group: ["GroupSeparator"],
	Meter: ["MeterIndicator", "MeterLabel", "MeterTrack", "MeterValue"],
	Menu: ["MenuShortcut"],
	OTPField: ["OTPFieldInput"],
	Pagination: [
		"PaginationContent",
		"PaginationEllipsis",
		"PaginationItem",
		"PaginationLink",
		"PaginationNext",
		"PaginationPrevious",
	],
	Popover: ["PopoverDescription", "PopoverTitle"],
	Sheet: ["SheetContent", "SheetFooter", "SheetHeader", "SheetPanel"],
	Toolbar: ["ToolbarSeparator"],
};

const defaultPreviewDirectPrimitiveParts = {
	...directPrimitiveParts,
	Avatar: ["AvatarFallback"],
	Autocomplete: ["AutocompleteInput", "AutocompleteItem", "AutocompleteList", "AutocompletePopup"],
	Combobox: ["ComboboxInput", "ComboboxItem", "ComboboxList", "ComboboxPopup"],
	OTPField: [],
	Pagination: [],
	Slider: ["SliderRange", "SliderThumb"],
};

const defaultPreviewNativeHelperParts = {
	AlertDialog: ["AlertDialogFooter", "AlertDialogHeader"],
	Autocomplete: ["AutocompleteCollection", "AutocompleteEmpty"],
	Combobox: ["ComboboxCollection", "ComboboxEmpty"],
	Command: ["CommandCollection", "CommandFooter", "CommandPanel", "CommandShortcut"],
	Dialog: ["DialogFooter", "DialogHeader", "DialogPanel"],
	Drawer: ["DrawerCreateHandle", "DrawerFooter", "DrawerHeader"],
	Group: ["GroupSeparator"],
	Meter: ["MeterIndicator", "MeterLabel", "MeterTrack", "MeterValue"],
	Menu: ["MenuShortcut"],
	OTPField: ["OTPFieldInput"],
	Pagination: [
		"PaginationContent",
		"PaginationEllipsis",
		"PaginationItem",
		"PaginationLink",
		"PaginationNext",
		"PaginationPrevious",
	],
	Popover: ["PopoverDescription", "PopoverTitle"],
	Sheet: ["SheetFooter", "SheetHeader", "SheetPanel"],
};

const directPrimitiveRoots = [
	"Accordion",
	"AlertDialog",
	"Autocomplete",
	"Avatar",
	"Calendar",
	"Checkbox",
	"Collapsible",
	"Combobox",
	"Command",
	"DatePicker",
	"Dialog",
	"Drawer",
	"Label",
	"Menu",
	"Meter",
	"OTPField",
	"Pagination",
	"Popover",
	"PreviewCard",
	"Progress",
	"RadioGroup",
	"ScrollArea",
	"Select",
	"Separator",
	"Sheet",
	"Slider",
	"Switch",
	"Tabs",
	"Toggle",
	"ToggleGroup",
	"Tooltip",
	"Toolbar",
];

test("direct primitives expose COSS-facing Bits-backed parts", async () => {
	const index = await readFile("packages/coss-svelte/src/index.js", "utf8");

	for (const root of directPrimitiveRoots) {
		const source = await readFile(`packages/coss-svelte/src/components/${root}.svelte`, "utf8");

		assert.match(source, /from "bits-ui"/, `${root} root imports Bits UI`);
	}

	for (const parts of Object.values(directPrimitiveParts)) {
		for (const part of parts) {
			assert.match(index, new RegExp(`\\b${part}\\b`), `${part} is exported`);

			const partSource = await readFile(
				`packages/coss-svelte/src/components/${part}.svelte`,
				"utf8"
			);
			assert.match(partSource, /from "bits-ui"/, `${part} imports Bits UI`);
			assert.match(partSource, /data-slot=|dataSlot=/, `${part} preserves a data-slot`);
		}
	}
});

test("compound helpers expose COSS-facing structured parts", async () => {
	const index = await readFile("packages/coss-svelte/src/index.js", "utf8");

	for (const parts of Object.values(nativeHelperParts)) {
		for (const part of parts) {
			assert.match(index, new RegExp(`\\b${part}\\b`), `${part} is exported`);

			const partSource = await readFile(
				`packages/coss-svelte/src/components/${part}.svelte`,
				"utf8"
			);
			assert.match(partSource, /data-slot=|dataSlot=/, `${part} preserves a data-slot`);
		}
	}
});

test("docs preview renderer exercises direct primitive parts", async () => {
	const previewRenderer = await readFile(
		"apps/www/src/lib/components/docs/component-preview-renderer.svelte",
		"utf8"
	);

	for (const part of [
		...Object.values(defaultPreviewDirectPrimitiveParts).flat(),
		...Object.values(defaultPreviewNativeHelperParts).flat(),
	]) {
		assert.match(
			previewRenderer,
			new RegExp(`<${part}\\b`),
			`${part} is used in the docs preview renderer`
		);
	}
});

test("tabs composition does not render inside fallback convenience panels", async () => {
	const source = await readFile("packages/coss-svelte/src/components/Tabs.svelte", "utf8");

	assert.match(
		source,
		/tabs = children \? \[\] : \["Overview", "Details"\]/,
		"Tabs should only use default convenience tabs when no composed children are supplied"
	);
});

test("overlay roots render provided trigger and popup children", async () => {
	for (const component of ["Popover", "PreviewCard", "Tooltip"]) {
		const source = await readFile(
			`packages/coss-svelte/src/components/${component}.svelte`,
			"utf8"
		);

		assert.match(source, /children/, `${component} accepts composed children`);
		assert.match(source, /@render (rootChildren|children)\(\)/, `${component} renders children`);
		assert.match(source, /{:else}/, `${component} keeps fallback convenience usage`);
	}
});

test("autocomplete input supports documented trigger affordance", async () => {
	const source = await readFile(
		"packages/coss-svelte/src/components/AutocompleteInput.svelte",
		"utf8"
	);
	const previewRenderer = await readFile(
		"apps/www/src/lib/components/docs/component-preview-renderer.svelte",
		"utf8"
	);

	assert.match(source, /showTrigger = false/, "AutocompleteInput exposes showTrigger");
	assert.match(
		source,
		/ComboboxPrimitive\.Trigger/,
		"AutocompleteInput uses Bits UI trigger for the trigger affordance"
	);
	assert.match(
		source,
		/data-slot="autocomplete-trigger"/,
		"AutocompleteInput preserves a trigger data-slot"
	);
	assert.doesNotMatch(
		previewRenderer,
		/<AutocompleteInput[^>]+showTrigger/,
		"COSS default autocomplete preview keeps the trigger hidden"
	);
});

test("autocomplete popup follows input width and empty state only shows without items", async () => {
	const themeSource = await readFile("packages/theme/src/style-coss.css", "utf8");

	assert.match(
		themeSource,
		/\.cn-autocomplete-input\s*\{[^}]*max-width:\s*32rem;/s,
		"autocomplete input should not stretch across wide preview surfaces"
	);
	assert.match(
		themeSource,
		/\.cn-autocomplete-popup\s*\{[^}]*width:\s*var\(--bits-combobox-anchor-width\);[^}]*min-width:\s*var\(--bits-combobox-anchor-width\);/s,
		"autocomplete popup should match the combobox anchor width"
	);
	assert.match(
		themeSource,
		/\.cn-autocomplete-popup:has\(\.cn-autocomplete-item\)\s*>\s*\.cn-autocomplete-empty\s*\{[^}]*display:\s*none;/s,
		"autocomplete empty state should be hidden when items are rendered"
	);
});

test("dropdown item text matches corresponding control text size", async () => {
	const themeSource = await readFile("packages/theme/src/style-coss.css", "utf8");

	assert.match(
		themeSource,
		/\.cn-select-item\s*\{[^}]*font-size:\s*1rem;/s,
		"select items should match mobile select trigger text"
	);
	assert.match(
		themeSource,
		/@media \(min-width:\s*640px\)\s*\{[\s\S]*?\.cn-select-item\s*\{[^}]*font-size:\s*0\.875rem;/,
		"select items should match desktop select trigger text"
	);
	assert.match(
		themeSource,
		/@media \(min-width:\s*640px\)\s*\{[\s\S]*?\.cn-command-item,\s*\.cn-autocomplete-item,\s*\.cn-combobox-item\s*\{[^}]*font-size:\s*0\.875rem;/,
		"command, autocomplete, and combobox items should match desktop input text"
	);
	assert.match(
		themeSource,
		/\.cn-menu-item,\s*\.cn-menu-sub-trigger\s*\{[^}]*font-size:\s*0\.875rem;/s,
		"menu items should match menu trigger text"
	);
	assert.match(
		themeSource,
		/\.docs-search-item\.cn-command-item\s*\{[^}]*font-size:\s*0\.875rem;/s,
		"docs command items should use compact command-palette text"
	);
});

test("combobox input includes the COSS trigger affordance by default", async () => {
	const source = await readFile("packages/coss-svelte/src/components/ComboboxInput.svelte", "utf8");
	const previewRenderer = await readFile(
		"apps/www/src/lib/components/docs/component-preview-renderer.svelte",
		"utf8"
	);

	assert.match(source, /showTrigger = true/, "ComboboxInput shows trigger by default");
	assert.match(
		source,
		/ComboboxPrimitive\.Trigger/,
		"ComboboxInput uses Bits UI trigger for the trigger affordance"
	);
	assert.match(
		previewRenderer,
		/<ComboboxInput[^>]+placeholder="Select a item…"/,
		"docs preview mirrors the COSS combobox particle input"
	);
});

test("accordion trigger includes the COSS chevron affordance", async () => {
	const [rootSource, triggerSource, themeSource] = await Promise.all([
		readFile("packages/coss-svelte/src/components/Accordion.svelte", "utf8"),
		readFile("packages/coss-svelte/src/components/AccordionTrigger.svelte", "utf8"),
		readFile("packages/theme/src/style-coss.css", "utf8"),
	]);

	for (const source of [rootSource, triggerSource]) {
		assert.match(
			source,
			/data-slot="accordion-indicator"/,
			"Accordion trigger renders an indicator slot"
		);
		assert.match(source, /d="m6 9 6 6 6-6"/, "Accordion trigger renders the chevron path");
		assert.match(
			source,
			/cn-accordion-indicator/,
			"Accordion trigger uses the themed indicator class"
		);
	}

	assert.match(themeSource, /\.cn-accordion-indicator/, "theme styles the accordion indicator");
});

test("accordion content stays mounted for responsive height animation", async () => {
	const [rootSource, contentSource, themeSource] = await Promise.all([
		readFile("packages/coss-svelte/src/components/Accordion.svelte", "utf8"),
		readFile("packages/coss-svelte/src/components/AccordionContent.svelte", "utf8"),
		readFile("packages/theme/src/style-coss.css", "utf8"),
	]);

	assert.match(
		contentSource,
		/forceMount\s*=\s*true/,
		"AccordionContent should stay mounted by default so CSS has closed/open states to animate"
	);
	assert.match(
		contentSource,
		/<AccordionPrimitive\.Content[^>]*\{forceMount\}/s,
		"AccordionContent should forward the forceMount prop to Bits UI"
	);

	for (const source of [rootSource, contentSource]) {
		assert.match(
			source,
			/cn-accordion-content-inner/,
			"Accordion content should wrap slotted content in a collapsible inner row"
		);
	}

	assert.match(
		themeSource,
		/\.cn-accordion-content-inner/,
		"theme should style the accordion content inner wrapper"
	);
	assert.match(
		themeSource,
		/grid-template-rows 120ms var\(--ease-out\)/,
		"accordion panel animation should be fast and use the shared ease-out curve"
	);
	const accordionContentRule = themeSource.match(/\.cn-accordion-content\s*{[^}]*}/s)?.[0] ?? "";
	assert.doesNotMatch(
		accordionContentRule,
		/grid-template-rows 180ms ease/,
		"accordion should not use the slower default grid transition"
	);
	assert.match(
		themeSource,
		/\.cn-accordion-indicator\s*{[^}]*transition:\s*transform 120ms var\(--ease-out\)/s,
		"accordion chevron should match the faster panel timing"
	);
});

test("collapsible content stays mounted for reversible panel animation", async () => {
	const [rootSource, contentSource, themeSource] = await Promise.all([
		readFile("packages/coss-svelte/src/components/Collapsible.svelte", "utf8"),
		readFile("packages/coss-svelte/src/components/CollapsibleContent.svelte", "utf8"),
		readFile("packages/theme/src/style-coss.css", "utf8"),
	]);

	assert.match(
		contentSource,
		/forceMount\s*=\s*true/,
		"CollapsibleContent should stay mounted by default so closing can animate"
	);
	assert.match(
		contentSource,
		/<CollapsiblePrimitive\.Content[^>]*\{forceMount\}/s,
		"CollapsibleContent should forward forceMount to Bits UI"
	);

	for (const source of [rootSource, contentSource]) {
		assert.match(
			source,
			/cn-collapsible-content-inner/,
			"Collapsible content should wrap slotted content in an animatable inner row"
		);
	}

	assert.match(
		themeSource,
		/\.cn-collapsible-content\s*\{[^}]*grid-template-rows 200ms var\(--ease-out\)/s,
		"collapsible panel animation should use the shared 200ms ease-out curve"
	);
	assert.match(
		themeSource,
		/\.cn-collapsible-content\[data-state="open"\]/,
		"collapsible content should expose an open layout state"
	);
	assert.match(
		themeSource,
		/\.cn-collapsible-content\[data-state="open"\][\s\S]*?grid-template-rows: 1fr/,
		"collapsible content should expand to its intrinsic height"
	);
	assert.match(
		themeSource,
		/\.cn-collapsible-content,\n\t\.cn-accordion-indicator,\n\t\.cn-collapsible-trigger svg/s,
		"reduced-motion styles should cover collapsible panel and trigger motion"
	);
});

test("select trigger includes the COSS icon affordance", async () => {
	const [rootSource, triggerSource, themeSource] = await Promise.all([
		readFile("packages/coss-svelte/src/components/Select.svelte", "utf8"),
		readFile("packages/coss-svelte/src/components/SelectTrigger.svelte", "utf8"),
		readFile("packages/theme/src/style-coss.css", "utf8"),
	]);

	for (const source of [rootSource, triggerSource]) {
		assert.match(source, /<svg/, "Select trigger renders an inline chevrons icon");
		assert.match(source, /d="m7 15 5 5 5-5"/, "Select trigger renders the down chevron path");
		assert.match(source, /d="m7 9 5-5 5 5"/, "Select trigger renders the up chevron path");
		assert.match(
			source,
			/data-slot="select-icon"/,
			"Select trigger preserves the select-icon data slot"
		);
		assert.match(source, /cn-select-icon/, "Select trigger uses the themed icon class");
	}

	assert.match(themeSource, /\.cn-select-icon/, "theme styles the select icon slot");
});

test("registry includes direct primitive part files", () => {
	for (const [root, parts] of Object.entries(directPrimitiveParts)) {
		const item = registryItems.find((registryItem) => registryItem.name === root);

		assert.ok(item, `${root} registry item exists`);

		const targets = item.files.map((file) => file.target);

		for (const part of parts) {
			assert.ok(targets.includes(`components/${part}.svelte`), `${root} registry includes ${part}`);
		}
	}

	for (const [root, parts] of Object.entries(nativeHelperParts)) {
		const item = registryItems.find((registryItem) => registryItem.name === root);

		assert.ok(item, `${root} registry item exists`);

		const targets = item.files.map((file) => file.target);

		for (const part of parts) {
			assert.ok(targets.includes(`components/${part}.svelte`), `${root} registry includes ${part}`);
		}
	}
});
