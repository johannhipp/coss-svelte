import { componentMetadata, componentParts } from "coss-svelte/metadata";

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

/** @type {Record<string, { description: string; status: string }>} */
const metadataByName = componentMetadata;

/** @type {Record<string, string[]>} */
const partsByName = componentParts;

const implementedElements = new Set(
	Object.keys(metadataByName).flatMap((name) =>
		metadataByName[name].status === "deferred" ? [] : [name, ...(partsByName[name] ?? [])]
	)
);

/** @type {Record<string, string[]>} */
const customPropsByElement = {
	Accordion: ["type", "value", "items"],
	AccordionContent: ["forceMount"],
	AlertDialog: ["open", "trigger", "title", "description"],
	Autocomplete: ["type", "value", "open", "options", "placeholder"],
	AutocompleteInput: ["showTrigger", "triggerProps"],
	Avatar: ["src", "alt", "fallback"],
	Badge: ["variant"],
	Breadcrumb: ["items"],
	Button: ["variant", "size", "href", "type", "loading", "disabled"],
	Calendar: ["type", "value"],
	Checkbox: ["id", "checked", "indeterminate", "label"],
	CheckboxGroup: ["label"],
	Collapsible: ["open", "title"],
	CollapsibleContent: ["forceMount"],
	Combobox: ["type", "value", "open", "options", "placeholder"],
	ComboboxInput: ["showTrigger", "triggerProps"],
	Command: ["value", "items", "placeholder", "label"],
	CommandDialog: ["open"],
	CommandInput: ["value"],
	DatePicker: ["value", "open", "label"],
	Dialog: ["open", "trigger", "title", "description"],
	Drawer: ["open", "trigger", "title", "description"],
	Field: ["label", "description", "error", "required"],
	FieldLabel: ["required"],
	Fieldset: ["legend", "description"],
	GroupSeparator: ["orientation"],
	Input: ["type", "value"],
	InputGroupAddon: ["align"],
	InputGroupInput: ["type"],
	Menu: ["open", "items", "label"],
	MenuItem: ["variant"],
	MenuSub: ["open"],
	Meter: ["value", "min", "max", "label", "style"],
	OTPField: ["value", "length"],
	Pagination: ["page", "pages", "count", "perPage"],
	PaginationLink: ["isActive"],
	Popover: ["open", "label"],
	PreviewCard: ["href", "label", "title", "description"],
	Progress: ["value", "min", "max", "label"],
	RadioGroup: ["value", "label", "options", "orientation"],
	ScrollAreaScrollbar: ["orientation"],
	Select: ["type", "value", "open", "options", "placeholder"],
	Separator: ["orientation"],
	Sheet: ["open", "side", "trigger", "title", "description"],
	SheetPopup: ["side"],
	Sidebar: ["items", "label", "side", "variant", "collapsible", "state"],
	SidebarGroupAction: ["type"],
	SidebarMenuAction: ["type", "showOnHover"],
	SidebarMenuButton: ["href", "type", "isActive", "size", "variant"],
	SidebarMenuSkeleton: ["showIcon"],
	SidebarMenuSubButton: ["href", "isActive", "size"],
	SidebarProvider: ["defaultOpen", "open"],
	SidebarRail: ["type"],
	SidebarTrigger: ["type"],
	Slider: ["type", "value", "min", "max", "step"],
	Spinner: ["label"],
	Switch: ["id", "checked", "label"],
	TableHead: ["scope"],
	Tabs: ["value", "tabs"],
	Toast: ["title", "description"],
	Toggle: ["pressed"],
	ToggleGroup: ["type", "value", "items"],
	Toolbar: ["orientation"],
	ToolbarGroup: ["type", "value"],
	ToolbarSeparator: ["orientation"],
	Tooltip: ["label", "tip"],
};

/** @type {Record<string, Omit<ApiProp, "name">>} */
const propMetadata = {
	align: {
		type: '"inline-start" | "inline-end" | string',
		default: '"inline-start"',
		description: "Positions the addon within an input group.",
	},
	alt: {
		type: "string",
		description: "Accessible text for the avatar image.",
	},
	checked: {
		type: "boolean",
		default: "false",
		description: "Checked state for the control. Bind with `bind:checked` when supported.",
	},
	collapsible: {
		type: '"offcanvas" | "icon" | "none" | string',
		default: '"offcanvas"',
		description: "Controls how the sidebar collapses.",
	},
	count: {
		type: "number",
		description: "Total item count used to calculate pagination.",
	},
	defaultOpen: {
		type: "boolean",
		default: "true",
		description: "Initial open state for the sidebar provider.",
	},
	description: {
		type: "string",
		default: '""',
		description: "Supporting text rendered by the component's built-in fallback layout.",
	},
	disabled: {
		type: "boolean",
		default: "false",
		description: "Disables interaction with the control.",
	},
	error: {
		type: "string",
		default: '""',
		description: "Validation message rendered by the field fallback layout.",
	},
	fallback: {
		type: "string",
		default: '""',
		description: "Text shown when the avatar image is unavailable.",
	},
	forceMount: {
		type: "boolean",
		description: "Keeps content mounted while closed so transitions can complete.",
	},
	href: {
		type: "string",
		default: '""',
		description: "Renders the component as a link target when provided.",
	},
	id: {
		type: "string",
		description: "ID forwarded to the form control.",
	},
	indeterminate: {
		type: "boolean",
		default: "false",
		description: "Displays the checkbox in an indeterminate state.",
	},
	isActive: {
		type: "boolean",
		default: "false",
		description: "Marks the item as the current or selected navigation target.",
	},
	items: {
		type: "Array<unknown>",
		default: "[]",
		description: "Items rendered by the component's built-in fallback composition.",
	},
	label: {
		type: "string",
		default: '""',
		description: "Accessible label or fallback visible label for the control.",
	},
	legend: {
		type: "string",
		default: '""',
		description: "Legend text rendered by the fieldset fallback layout.",
	},
	length: {
		type: "number",
		default: "6",
		description: "Number of one-time-code cells to render.",
	},
	loading: {
		type: "boolean",
		default: "false",
		description: "Shows the loading indicator and disables the button.",
	},
	max: {
		type: "number",
		default: "100",
		description: "Maximum value for the control.",
	},
	min: {
		type: "number",
		default: "0",
		description: "Minimum value for the control.",
	},
	open: {
		type: "boolean",
		default: "false",
		description: "Open state for the popup or disclosure. Bind with `bind:open`.",
	},
	options: {
		type: "Array<string | { value?: unknown; label?: string; disabled?: boolean }>",
		default: "[]",
		description: "Options rendered by the component's built-in fallback composition.",
	},
	orientation: {
		type: '"horizontal" | "vertical"',
		default: '"horizontal"',
		description: "Layout direction for the component.",
	},
	page: {
		type: "number",
		default: "2",
		description: "Current page. Bind with `bind:page`.",
	},
	pages: {
		type: "number",
		default: "5",
		description: "Total number of pages to render when count is not provided.",
	},
	perPage: {
		type: "number",
		description: "Items per page used with count to calculate page totals.",
	},
	placeholder: {
		type: "string",
		default: '"Search"',
		description: "Placeholder text shown by the built-in input.",
	},
	pressed: {
		type: "boolean",
		default: "false",
		description: "Pressed state for the toggle. Bind with `bind:pressed`.",
	},
	required: {
		type: "boolean",
		default: "false",
		description: "Marks the field or label as required.",
	},
	scope: {
		type: '"col" | "row" | string',
		default: '"col"',
		description: "Scope attribute forwarded to the table header cell.",
	},
	showIcon: {
		type: "boolean",
		default: "false",
		description: "Shows the icon placeholder in the sidebar skeleton row.",
	},
	showOnHover: {
		type: "boolean",
		default: "false",
		description: "Only reveals the menu action when the parent item is hovered or focused.",
	},
	showTrigger: {
		type: "boolean",
		default: "false",
		description: "Shows a trigger button beside the input.",
	},
	side: {
		type: '"top" | "right" | "bottom" | "left" | string',
		default: '"right"',
		description: "Side from which the surface appears.",
	},
	size: {
		type: '"default" | "xs" | "sm" | "lg" | "xl" | string',
		default: '"default"',
		description: "Size variant for the component.",
	},
	src: {
		type: "string",
		default: '""',
		description: "Image source for the avatar.",
	},
	state: {
		type: '"expanded" | "collapsed" | string',
		description: "Visual state used by the sidebar fallback layout.",
	},
	step: {
		type: "number",
		default: "1",
		description: "Increment used when changing slider values.",
	},
	style: {
		type: "string",
		default: '""',
		description: "Inline style forwarded to the rendered element.",
	},
	tabs: {
		type: "string[]",
		default: '["Overview", "Details"]',
		description: "Tab labels rendered by the built-in fallback layout.",
	},
	tip: {
		type: "string",
		default: '"Tooltip"',
		description: "Fallback tooltip content.",
	},
	title: {
		type: "string",
		default: '""',
		description: "Title text rendered by the component's built-in fallback layout.",
	},
	trigger: {
		type: "string",
		default: '"Open"',
		description: "Fallback trigger text rendered when custom children are not provided.",
	},
	triggerProps: {
		type: "Record<string, unknown>",
		default: "{}",
		description: "Props forwarded to the optional trigger button.",
	},
	type: {
		type: "string",
		default: '"button"',
		description: "Behavior, selection, or HTML type passed to the underlying control.",
	},
	value: {
		type: "unknown",
		default: '""',
		description: "Current value for the component. Bind with `bind:value` when supported.",
	},
	variant: {
		type: "string",
		default: '"default"',
		description: "Visual variant for the component.",
	},
};

/** @type {Record<string, Record<string, Partial<Omit<ApiProp, "name">>>>} */
const propOverridesByElement = {
	Accordion: { type: { default: '"single"' } },
	AccordionContent: { forceMount: { default: "true" } },
	AlertDialog: { trigger: { default: '"Open alert dialog"' } },
	Autocomplete: { type: { default: '"single"' } },
	Badge: { variant: { default: '"neutral"' } },
	Calendar: { type: { default: '"single"' }, value: { default: undefined } },
	Combobox: { placeholder: { default: '"Choose"' }, type: { default: '"single"' } },
	ComboboxInput: { showTrigger: { default: "true" } },
	Command: { label: { default: '"Command menu"' }, placeholder: { default: '"Type a command"' } },
	DatePicker: { label: { default: '"Choose date"' }, value: { default: undefined } },
	GroupSeparator: { orientation: { default: '"vertical"' } },
	Input: { type: { default: '"text"' }, value: { default: undefined } },
	InputGroupInput: { type: { default: '"text"' } },
	Menu: { label: { default: '"Menu"' } },
	Meter: { value: { default: "70" } },
	Pagination: { count: { default: "totalPages" } },
	Popover: { label: { default: '"Popover"' } },
	PreviewCard: {
		href: { default: '"#"' },
		label: { default: '"Preview"' },
		title: { default: '"Preview"' },
	},
	Progress: { value: { default: "45" } },
	RadioGroup: { orientation: { default: '"vertical"' } },
	ScrollAreaScrollbar: { orientation: { default: '"vertical"' } },
	Select: { placeholder: { default: '"Select"' }, type: { default: '"single"' } },
	Sidebar: {
		label: { default: '"Sidebar"' },
		side: { default: '"left"' },
		state: { default: '"expanded"' },
		variant: { default: '"sidebar"' },
	},
	SidebarMenuButton: { href: { default: "undefined" } },
	SidebarMenuSubButton: { href: { default: '"#"' }, size: { default: '"md"' } },
	SidebarProvider: { defaultOpen: { default: "true" }, open: { default: "defaultOpen" } },
	Slider: { type: { default: '"single"' } },
	Switch: { id: { default: "useId()" } },
	Tabs: { value: { default: '"tab-1"' }, tabs: { default: '["Overview", "Details"]' } },
	ToggleGroup: {
		type: { default: '"single"', description: "Selection mode for the toggle group." },
	},
	ToolbarGroup: {
		type: { default: '"single"', description: "Selection mode for the toolbar group." },
	},
	ToolbarSeparator: { orientation: { default: '"vertical"' } },
};

/** @type {[RegExp, string][]} */
const suffixDescriptions = [
	[/Action$/, "Renders the primary action for the parent component."],
	[/Addon$/, "Renders supporting content attached to an input group."],
	[/Body$/, "Groups the main rows or body content."],
	[/Button$/, "Renders a button-shaped control for the parent component."],
	[/Cancel$/, "Renders a cancellation action for the parent component."],
	[/Caption$/, "Provides a caption for the parent component."],
	[/Cell$/, "Renders one cell within the parent component."],
	[/Clear$/, "Renders a control that clears the current value."],
	[/Close$/, "Renders a control that closes the parent surface."],
	[/Collection$/, "Connects repeated items to the parent collection state."],
	[/Content$/, "Wraps the primary content for the parent component."],
	[/Corner$/, "Renders the corner where horizontal and vertical scrollbars meet."],
	[/Description$/, "Provides supporting copy for the parent component."],
	[/Dialog$/, "Composes the parent component into a dialog-style surface."],
	[/Ellipsis$/, "Represents skipped pages in pagination."],
	[/Empty$/, "Renders fallback content when the collection has no results."],
	[/Error$/, "Renders validation or error feedback for the parent field."],
	[/Fallback$/, "Renders fallback content when primary media is unavailable."],
	[/Footer$/, "Groups footer content and actions for the parent component."],
	[/GroupAction$/, "Renders an action associated with a sidebar group."],
	[/GroupContent$/, "Wraps the content inside a sidebar group."],
	[/GroupItem$/, "Renders one item inside a toolbar group."],
	[/GroupLabel$/, "Labels a group of related items."],
	[/Group$/, "Groups related items inside the parent component."],
	[/Handle$/, "Renders the drag or grab handle for the parent component."],
	[/Head$/, "Renders a header cell for a table."],
	[/Header$/, "Groups heading content for the parent component."],
	[/Image$/, "Renders the primary image for the parent component."],
	[/Indicator$/, "Renders the visual indicator for the current value or state."],
	[/Input$/, "Renders the input field for the parent component."],
	[/Inset$/, "Wraps page content adjacent to the sidebar."],
	[/Item$/, "Renders one selectable or repeated item."],
	[/Label$/, "Labels the parent component or a grouped section."],
	[/Legend$/, "Names the grouped controls inside a fieldset."],
	[/Link$/, "Renders a link-styled navigation item."],
	[/List$/, "Wraps a list of related items."],
	[/Media$/, "Renders the media area for the parent component."],
	[/MenuAction$/, "Renders an action attached to a sidebar menu item."],
	[/MenuBadge$/, "Renders a badge inside a sidebar menu item."],
	[/MenuButton$/, "Renders the main interactive sidebar menu control."],
	[/MenuItem$/, "Renders one item inside a sidebar menu."],
	[/MenuSkeleton$/, "Renders a loading placeholder for sidebar menu content."],
	[/MenuSubButton$/, "Renders an interactive item inside a sidebar submenu."],
	[/MenuSubItem$/, "Renders one item inside a sidebar submenu."],
	[/MenuSub$/, "Groups nested sidebar menu content."],
	[/Menu$/, "Groups sidebar menu items."],
	[/NextButton$/, "Renders the next-page button control."],
	[/Next$/, "Renders navigation to the next page."],
	[/Page$/, "Renders one numbered page control."],
	[/Panel$/, "Renders the main panel surface for the parent component."],
	[/Popup$/, "Renders the floating or modal surface for the parent component."],
	[/PrevButton$/, "Renders the previous-page button control."],
	[/Previous$/, "Renders navigation to the previous page."],
	[/Provider$/, "Provides shared state and context to child components."],
	[/Rail$/, "Renders the sidebar resize or collapse rail."],
	[/Range$/, "Renders the filled range between slider values."],
	[/Row$/, "Renders one row inside the parent table."],
	[/Scrollbar$/, "Renders a scrollbar for the scroll area."],
	[/Separator$/, "Visually separates related content."],
	[/Shortcut$/, "Displays a keyboard shortcut hint."],
	[/Status$/, "Renders status text for the current collection state."],
	[/SubPopup$/, "Renders the floating surface for a submenu."],
	[/SubTrigger$/, "Renders the control that opens a submenu."],
	[/Sub$/, "Provides state and structure for nested menu content."],
	[/Text$/, "Renders text content inside the parent component."],
	[/Textarea$/, "Renders a multiline input inside the parent component."],
	[/ThumbLabel$/, "Labels a slider thumb."],
	[/Thumb$/, "Renders the draggable or moving indicator."],
	[/TickLabel$/, "Labels a slider tick mark."],
	[/Tick$/, "Renders one slider tick mark."],
	[/Title$/, "Names the parent surface or section."],
	[/Track$/, "Renders the track that contains the current value indicator."],
	[/Trigger$/, "Renders the control that opens, closes, or selects related content."],
	[/Value$/, "Renders the current value for the parent component."],
	[/Validity$/, "Renders validation state for the parent field."],
	[/Viewport$/, "Wraps the scrollable viewport for the parent component."],
];

/**
 * @param {string} rootName
 * @param {string} elementName
 */
function descriptionForElement(rootName, elementName) {
	if (elementName === rootName) {
		const metadata = metadataByName[rootName];
		return metadata.status === "deferred"
			? "Deferred numeric input component; no implemented Svelte API is published yet."
			: metadata.description;
	}

	for (const [pattern, description] of suffixDescriptions) {
		if (pattern.test(elementName)) {
			return description;
		}
	}

	return `Renders a ${rootName} part used to compose the component.`;
}

/**
 * @param {string} elementName
 * @param {string} name
 * @returns {ApiProp}
 */
function propForName(elementName, name) {
	const metadata = {
		...(propMetadata[name] ?? {
			type: "unknown",
			description: `Configures the ${name} behavior for this component.`,
		}),
		...(propOverridesByElement[elementName]?.[name] ?? {}),
	};

	return {
		name,
		...metadata,
	};
}

/** @returns {ApiProp} */
function classProp() {
	return {
		name: "class",
		type: "string",
		default: '""',
		description: "Additional classes for the rendered element.",
	};
}

/**
 * @param {string} elementName
 * @returns {ApiProp}
 */
function restProp(elementName) {
	return {
		name: "...rest",
		type: "Record<string, unknown>",
		description: `Additional props forwarded by ${elementName}.`,
	};
}

/**
 * @param {string} elementName
 * @returns {ApiProp[]}
 */
function propsForElement(elementName) {
	if (!implementedElements.has(elementName)) {
		return [];
	}

	return [
		...(customPropsByElement[elementName] ?? []).map((name) => propForName(elementName, name)),
		classProp(),
		restProp(elementName),
	];
}

/**
 * @param {string} name
 * @returns {ApiElement[]}
 */
function apiReferenceForComponent(name) {
	const elements = [name, ...(partsByName[name] ?? [])];

	return elements.map((elementName) => ({
		name: elementName,
		description: descriptionForElement(name, elementName),
		props: propsForElement(elementName),
	}));
}

/** @type {ComponentApiReference} */
export const componentApiReference = Object.fromEntries(
	Object.keys(metadataByName).map((name) => [name, apiReferenceForComponent(name)])
);

/**
 * @param {string} name
 * @returns {ApiElement[]}
 */
export function getComponentApiReference(name) {
	return componentApiReference[name] ?? [];
}
