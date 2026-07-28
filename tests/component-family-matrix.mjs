export const componentFamilyGates = Object.freeze([
	"ssr",
	"hydrate",
	"binding",
	"keyboard",
	"focus",
	"portal",
	"form",
	"disabled",
	"locale",
	"reduced-motion",
	"axe",
]);

export const componentFamilies = Object.freeze([
	"modal",
	"floating",
	"menu",
	"listbox",
	"choice",
	"disclosure",
	"date-range",
	"native-form",
	"managed-feedback",
	"action",
	"presentational",
]);

export const componentEvidenceRegistry = Object.freeze({
	"browser:catalog-ssr": {
		runner: "browser",
		handler: "catalogSsr",
		suite: "components",
		family: "catalog",
	},
	"browser:catalog-hydrate": {
		runner: "browser",
		handler: "catalogHydrate",
		suite: "components",
		family: "catalog",
	},
	"browser:catalog-axe": {
		runner: "browser",
		handler: "catalogAxe",
		suite: "components",
		family: "catalog",
	},
	"browser:dialog-modal": {
		runner: "browser",
		handler: "dialogModal",
		suite: "components",
		family: "modal",
	},
	"browser:alert-dialog-modal": {
		runner: "browser",
		handler: "alertDialogModal",
		suite: "components",
		family: "modal",
	},
	"browser:sheet-modal": {
		runner: "browser",
		handler: "sheetModal",
		suite: "components",
		family: "modal",
	},
	"browser:drawer-modal": {
		runner: "browser",
		handler: "drawerModal",
		suite: "components",
		family: "modal",
	},
	"browser:command-dialog-modal": {
		runner: "browser",
		handler: "commandDialogModal",
		suite: "components",
		family: "modal",
	},
	"browser:floating-behavior": {
		runner: "browser",
		handler: "floatingBehavior",
		suite: "components",
		family: "floating",
	},
	"browser:menu-behavior": {
		runner: "browser",
		handler: "menuBehavior",
		suite: "components",
		family: "menu",
	},
	"browser:context-menu-behavior": {
		runner: "browser",
		handler: "contextMenuBehavior",
		suite: "components",
		family: "menu",
	},
	"browser:listbox-behavior": {
		runner: "browser",
		handler: "listboxBehavior",
		suite: "components",
		family: "listbox",
	},
	"browser:choice-behavior": {
		runner: "browser",
		handler: "choiceBehavior",
		suite: "components",
		family: "choice",
	},
	"browser:disclosure-behavior": {
		runner: "browser",
		handler: "disclosureBehavior",
		suite: "components",
		family: "disclosure",
	},
	"browser:date-range-behavior": {
		runner: "browser",
		handler: "dateRangeBehavior",
		suite: "components",
		family: "date-range",
	},
	"browser:native-form-behavior": {
		runner: "browser",
		handler: "nativeFormBehavior",
		suite: "components",
		family: "native-form",
	},
	"browser:managed-feedback": {
		runner: "browser",
		handler: "managedFeedback",
		suite: "components",
		family: "managed-feedback",
	},
	"browser:action-behavior": {
		runner: "browser",
		handler: "actionBehavior",
		suite: "components",
		family: "action",
	},
	"runtime:form-controls-form": {
		runner: "vitest",
		file: "packages/coss-svelte/tests/form-contracts.test.ts",
		title:
			"[runtime:form-controls-form] serializes native and PinInput-backed text values and omits disabled controls",
	},
	"runtime:choice-form": {
		runner: "vitest",
		file: "packages/coss-svelte/tests/form-contracts.test.ts",
		title: "[runtime:choice-form] serializes CheckboxGroup and RadioGroup selections",
	},
	"runtime:listbox-form": {
		runner: "vitest",
		file: "packages/coss-svelte/tests/form-contracts.test.ts",
		title: "[runtime:listbox-form] serializes single Select, Combobox, and Autocomplete values",
	},
	"runtime:number-field-form": {
		runner: "vitest",
		file: "packages/coss-svelte/tests/number-field.test.ts",
		title:
			"[runtime:number-field-form] serializes one invariant value and resets to the captured initial default",
	},
	"runtime:date-picker-locale": {
		runner: "vitest",
		file: "packages/coss-svelte/tests/date-picker.test.ts",
		title: "[runtime:date-picker-locale] updates formatting when locale changes",
	},
	"runtime:number-field-locale": {
		runner: "vitest",
		file: "packages/coss-svelte/tests/number-field.test.ts",
		title:
			"[runtime:number-field-locale] updates locale and format without changing the canonical value",
	},
	"runtime:context-menu-binding": {
		runner: "vitest",
		file: "packages/coss-svelte/tests/context-menu.test.ts",
		title: "[runtime:context-menu-binding] binds checkbox, indeterminate, and radio state",
	},
	"ssr:number-field": {
		runner: "ssr-vitest",
		file: "packages/coss-svelte/tests/number-field-ssr.test.ts",
		title: "[ssr:number-field] emits deterministic spinbutton and form markup",
	},
	"ssr:context-menu": {
		runner: "ssr-vitest",
		file: "packages/coss-svelte/tests/context-menu-ssr.test.ts",
		title: "[ssr:context-menu] imports and renders closed trigger targets",
	},
	"ssr:date-picker": {
		runner: "ssr-vitest",
		file: "packages/coss-svelte/tests/date-picker-ssr.test.ts",
		title: "[ssr:date-picker] has deterministic output with its explicit default locale",
	},
});

const catalogEvidence = Object.freeze({
	ssr: ["browser:catalog-ssr"],
	hydrate: ["browser:catalog-hydrate"],
	axe: ["browser:catalog-axe"],
});

const familyRequirements = Object.freeze({
	modal: ["ssr", "hydrate", "binding", "keyboard", "focus", "portal", "reduced-motion", "axe"],
	floating: ["ssr", "hydrate", "keyboard", "focus", "portal", "reduced-motion", "axe"],
	menu: ["ssr", "hydrate", "binding", "keyboard", "focus", "portal", "disabled", "axe"],
	listbox: ["ssr", "hydrate", "binding", "keyboard", "focus", "portal", "form", "disabled", "axe"],
	choice: ["ssr", "hydrate", "binding", "keyboard", "disabled", "axe"],
	disclosure: ["ssr", "hydrate", "binding", "keyboard", "focus", "axe"],
	"date-range": ["ssr", "hydrate", "binding", "keyboard", "disabled", "axe"],
	"native-form": ["ssr", "hydrate", "binding", "keyboard", "form", "disabled", "axe"],
	"managed-feedback": ["ssr", "hydrate", "binding", "focus", "reduced-motion", "axe"],
	action: ["ssr", "hydrate", "keyboard", "focus", "disabled", "axe"],
	presentational: ["ssr", "hydrate", "axe"],
});

const familyBrowserEvidence = Object.freeze({
	floating: "browser:floating-behavior",
	listbox: "browser:listbox-behavior",
	choice: "browser:choice-behavior",
	disclosure: "browser:disclosure-behavior",
	"date-range": "browser:date-range-behavior",
	"native-form": "browser:native-form-behavior",
	"managed-feedback": "browser:managed-feedback",
	action: "browser:action-behavior",
});

const modalEvidence = Object.freeze({
	AlertDialog: "browser:alert-dialog-modal",
	Command: "browser:command-dialog-modal",
	Dialog: "browser:dialog-modal",
	Drawer: "browser:drawer-modal",
	Sheet: "browser:sheet-modal",
});

const menuEvidence = Object.freeze({
	ContextMenu: "browser:context-menu-behavior",
	Menu: "browser:menu-behavior",
});

const implementationKeys = Object.freeze({
	Accordion: "bits-accordion",
	Alert: "native-alert",
	AlertDialog: "bits-alert-dialog",
	Autocomplete: "bits-combobox-autocomplete",
	Avatar: "bits-avatar",
	Badge: "native-badge",
	Breadcrumb: "native-breadcrumb",
	Button: "native-button-link",
	Calendar: "bits-calendar",
	Card: "native-card",
	Checkbox: "bits-checkbox",
	CheckboxGroup: "bits-checkbox-group",
	Collapsible: "bits-collapsible",
	Combobox: "bits-combobox",
	Command: "bits-command-dialog",
	ContextMenu: "bits-context-menu",
	DatePicker: "bits-date-picker",
	Dialog: "bits-dialog",
	Drawer: "bits-dialog-drawer",
	Empty: "native-empty",
	Field: "native-field",
	Fieldset: "native-fieldset",
	Form: "native-form",
	Frame: "native-frame",
	Group: "native-group",
	Input: "native-input",
	InputGroup: "native-input-group",
	Kbd: "native-kbd",
	Label: "bits-label",
	Menu: "bits-dropdown-menu",
	Meter: "bits-meter",
	NumberField: "custom-number-field",
	OTPField: "bits-pin-input",
	Pagination: "bits-pagination",
	Popover: "bits-popover",
	PreviewCard: "bits-link-preview",
	Progress: "bits-progress",
	RadioGroup: "bits-radio-group",
	ScrollArea: "bits-scroll-area",
	Select: "bits-select",
	Separator: "bits-separator",
	Sheet: "bits-dialog-sheet",
	Sidebar: "bits-collapsible-sidebar",
	Skeleton: "native-skeleton",
	Slider: "bits-slider",
	Spinner: "native-spinner",
	Switch: "bits-switch",
	Table: "native-table",
	Tabs: "bits-tabs",
	Textarea: "native-textarea",
	Toast: "custom-toast-store",
	Toggle: "bits-toggle",
	ToggleGroup: "bits-toggle-group",
	Toolbar: "bits-toolbar",
	Tooltip: "bits-tooltip",
});

function evidenceFor(root, family, required) {
	const interaction =
		family === "modal"
			? modalEvidence[root]
			: family === "menu"
				? menuEvidence[root]
				: familyBrowserEvidence[family];
	const evidence = {};

	for (const gate of required) {
		if (catalogEvidence[gate]) {
			evidence[gate] = catalogEvidence[gate];
			continue;
		}
		evidence[gate] = interaction ? [interaction] : [];
	}

	if (family === "listbox") evidence.form = ["runtime:listbox-form"];
	if (family === "native-form") evidence.form = ["runtime:form-controls-form"];
	if (["Checkbox", "CheckboxGroup", "RadioGroup", "Switch"].includes(root)) {
		evidence.form = ["runtime:choice-form"];
	}
	if (root === "NumberField") {
		evidence.ssr = ["ssr:number-field"];
		evidence.form = ["runtime:number-field-form"];
		evidence.locale = ["runtime:number-field-locale"];
	}
	if (root === "DatePicker") {
		evidence.ssr = ["ssr:date-picker"];
		evidence.locale = ["runtime:date-picker-locale"];
	}
	if (root === "Calendar") evidence.locale = ["browser:date-range-behavior"];
	if (root === "ContextMenu") {
		evidence.ssr = ["ssr:context-menu"];
		evidence.binding = ["runtime:context-menu-binding"];
	}

	return evidence;
}

function row(root, family, extraRequired = []) {
	const required = [...new Set([...familyRequirements[family], ...extraRequired])];
	return Object.freeze({
		root,
		family,
		implementation: implementationKeys[root],
		required: Object.freeze(required),
		evidence: Object.freeze(evidenceFor(root, family, required)),
	});
}

export const componentFamilyMatrix = Object.freeze([
	row("Accordion", "disclosure"),
	row("Alert", "presentational"),
	row("AlertDialog", "modal"),
	row("Autocomplete", "listbox"),
	row("Avatar", "presentational"),
	row("Badge", "presentational"),
	row("Breadcrumb", "presentational"),
	row("Button", "action"),
	row("Calendar", "date-range", ["locale"]),
	row("Card", "presentational"),
	row("Checkbox", "choice", ["form"]),
	row("CheckboxGroup", "choice", ["form"]),
	row("Collapsible", "disclosure"),
	row("Combobox", "listbox"),
	row("Command", "modal"),
	row("ContextMenu", "menu"),
	row("DatePicker", "date-range", ["portal", "locale"]),
	row("Dialog", "modal"),
	row("Drawer", "modal"),
	row("Empty", "presentational"),
	row("Field", "presentational"),
	row("Fieldset", "presentational"),
	row("Form", "presentational"),
	row("Frame", "presentational"),
	row("Group", "presentational"),
	row("Input", "native-form"),
	row("InputGroup", "presentational"),
	row("Kbd", "presentational"),
	row("Label", "presentational"),
	row("Menu", "menu"),
	row("Meter", "presentational"),
	row("NumberField", "date-range", ["form", "locale"]),
	row("OTPField", "native-form"),
	row("Pagination", "action"),
	row("Popover", "floating"),
	row("PreviewCard", "floating"),
	row("Progress", "presentational"),
	row("RadioGroup", "choice", ["form"]),
	row("ScrollArea", "presentational"),
	row("Select", "listbox"),
	row("Separator", "presentational"),
	row("Sheet", "modal"),
	row("Sidebar", "disclosure"),
	row("Skeleton", "presentational"),
	row("Slider", "date-range"),
	row("Spinner", "presentational"),
	row("Switch", "choice", ["form"]),
	row("Table", "presentational"),
	row("Tabs", "disclosure"),
	row("Textarea", "native-form"),
	row("Toast", "managed-feedback"),
	row("Toggle", "choice"),
	row("ToggleGroup", "choice"),
	row("Toolbar", "action"),
	row("Tooltip", "floating"),
]);
