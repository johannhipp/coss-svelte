import { componentMetadata, componentParts } from "coss-svelte/metadata";

/**
 * Curated API prose and defaults. Type strings and binding facts are generated
 * from the packaged declarations by scripts/build-api-reference.mjs.
 *
 * @typedef {{ default?: string; description: string }} CuratedProp
 * @typedef {{
 *   description: string;
 *   ownProps: Record<string, CuratedProp>;
 *   signatureProps?: string[];
 * }} ApiContract
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
	CommandGroup: ["forceMount"],
	CommandInput: ["value"],
	ContextMenu: ["open", "dir"],
	ContextMenuCheckboxItem: [
		"checked",
		"indeterminate",
		"variant",
		"disabled",
		"closeOnSelect",
		"textValue",
	],
	ContextMenuGroupLabel: ["inset"],
	ContextMenuItem: ["variant", "inset", "disabled", "closeOnSelect", "textValue"],
	ContextMenuLinkItem: [
		"href",
		"target",
		"rel",
		"download",
		"hreflang",
		"referrerpolicy",
		"variant",
		"inset",
		"disabled",
		"closeOnSelect",
		"textValue",
	],
	ContextMenuPopup: [
		"side",
		"sideOffset",
		"align",
		"alignOffset",
		"collisionPadding",
		"loop",
		"preventScroll",
		"forceMount",
		"escapeKeydownBehavior",
		"interactOutsideBehavior",
		"portalProps",
	],
	ContextMenuRadioGroup: ["value"],
	ContextMenuRadioItem: ["value", "disabled", "closeOnSelect", "textValue"],
	ContextMenuSub: ["open"],
	ContextMenuSubPopup: [
		"side",
		"sideOffset",
		"align",
		"alignOffset",
		"collisionPadding",
		"loop",
		"forceMount",
		"escapeKeydownBehavior",
		"interactOutsideBehavior",
		"portalProps",
	],
	ContextMenuSubTrigger: ["inset", "disabled", "textValue", "openDelay"],
	ContextMenuTrigger: ["disabled"],
	DatePicker: ["value", "open", "locale", "label", "previousMonthLabel", "nextMonthLabel"],
	Dialog: ["open", "trigger", "title", "description"],
	DialogPopup: ["portalProps"],
	Drawer: ["open", "trigger", "title", "description"],
	DrawerPopup: ["portalProps"],
	Field: ["id", "label", "description", "error", "required", "disabled", "invalid"],
	FieldLabel: ["required", "for"],
	Fieldset: ["legend", "description"],
	GroupSeparator: ["orientation"],
	Input: ["type", "value"],
	InputGroupAddon: ["align"],
	InputGroupInput: ["type"],
	Menu: ["open", "items", "label"],
	MenuPopup: ["portalProps"],
	MenuItem: ["variant"],
	MenuSub: ["open"],
	Meter: ["value", "min", "max", "label", "style"],
	NumberField: [
		"ref",
		"defaultValue",
		"value",
		"min",
		"max",
		"step",
		"smallStep",
		"largeStep",
		"locale",
		"format",
		"label",
		"size",
		"id",
		"name",
		"form",
		"required",
		"disabled",
		"readonly",
		"invalid",
		"allowWheelScrub",
		"onValueChange",
		"onValueCommit",
	],
	NumberFieldDecrement: ["ref"],
	NumberFieldGroup: ["ref"],
	NumberFieldIncrement: ["ref"],
	NumberFieldInput: ["ref"],
	NumberFieldScrubArea: ["label", "ref"],
	OTPField: ["value", "length", "name", "required", "disabled", "onComplete"],
	Pagination: ["page", "pages", "count", "perPage"],
	PaginationLink: ["isActive"],
	PaginationNext: ["href"],
	PaginationPrevious: ["href"],
	Popover: ["open", "label"],
	PopoverPopup: ["portalProps"],
	PreviewCard: ["href", "label", "title", "description"],
	PreviewCardPopup: ["portalProps"],
	Progress: ["value", "min", "max", "label"],
	RadioGroup: ["value", "label", "options", "orientation"],
	ScrollAreaScrollbar: ["orientation"],
	Select: ["type", "value", "open", "options", "placeholder"],
	SelectPopup: ["portalProps"],
	Separator: ["orientation"],
	Sheet: ["open", "side", "trigger", "title", "description"],
	SheetPopup: ["side", "portalProps"],
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
	Toast: ["title", "description", "open", "dismissible", "closeLabel", "ondismiss"],
	Toggle: ["pressed"],
	ToggleGroup: ["type", "value", "items"],
	Toolbar: ["orientation"],
	ToolbarGroup: ["type", "value"],
	ToolbarSeparator: ["orientation"],
	Tooltip: ["label", "tip"],
	TooltipPopup: ["portalProps"],
	AlertDialogPopup: ["portalProps"],
	AutocompletePopup: ["portalProps"],
	ComboboxPopup: ["portalProps"],
	CommandDialogPopup: ["portalProps"],
};

/** @type {Record<string, CuratedProp>} */
const propMetadata = {
	align: {
		default: '"inline-start"',
		description: "Positions the addon within an input group.",
	},
	alt: {
		description: "Accessible text for the avatar image.",
	},
	checked: {
		default: "false",
		description: "Checked state for the control. Bind with `bind:checked` when supported.",
	},
	collapsible: {
		default: '"offcanvas"',
		description: "Controls how the sidebar collapses.",
	},
	count: {
		description: "Total item count used to calculate pagination.",
	},
	closeLabel: {
		default: '"Dismiss notification"',
		description: "Accessible label for the toast dismiss button.",
	},
	defaultOpen: {
		default: "true",
		description: "Initial open state for the sidebar provider.",
	},
	defaultValue: {
		default: "null",
		description: "Initial value and the captured native form-reset baseline.",
	},
	description: {
		default: '""',
		description: "Supporting text rendered by the component's built-in fallback layout.",
	},
	dismissible: {
		default: "true",
		description: "Shows a dismiss button that hides the toast when activated.",
	},
	dir: {
		default: '"ltr"',
		description: "Sets logical keyboard navigation, placement, and chevron direction.",
	},
	disabled: {
		default: "false",
		description: "Disables interaction with the control.",
	},
	error: {
		default: '""',
		description: "Validation message rendered by the field fallback layout.",
	},
	escapeKeydownBehavior: {
		description: "Controls which nested dismissible layer handles Escape.",
	},
	fallback: {
		default: '""',
		description: "Text shown when the avatar image is unavailable.",
	},
	forceMount: {
		description: "Keeps content mounted while closed so transitions can complete.",
	},
	form: {
		description: "Associates the control with a form elsewhere in the document.",
	},
	format: {
		default: "{}",
		description: "Formats the committed display value with `Intl.NumberFormat`.",
	},
	href: {
		default: '""',
		description: "Renders the component as a link target when provided.",
	},
	id: {
		description: "ID forwarded to the form control.",
	},
	indeterminate: {
		default: "false",
		description: "Displays the checkbox in an indeterminate state.",
	},
	interactOutsideBehavior: {
		default: '"close"',
		description: "Controls how this floating layer responds to an outside pointer interaction.",
	},
	isActive: {
		default: "false",
		description: "Marks the item as the current or selected navigation target.",
	},
	items: {
		default: "[]",
		description: "Items rendered by the component's built-in fallback composition.",
	},
	label: {
		default: '""',
		description: "Accessible label or fallback visible label for the control.",
	},
	legend: {
		default: '""',
		description: "Legend text rendered by the fieldset fallback layout.",
	},
	length: {
		default: "6",
		description: "Number of one-time-code cells to render.",
	},
	largeStep: {
		default: "10",
		description: "Increment used by PageUp/PageDown and Shift+Arrow keys.",
	},
	loading: {
		default: "false",
		description: "Shows the loading indicator and disables the button.",
	},
	max: {
		default: "100",
		description: "Maximum value for the control.",
	},
	min: {
		default: "0",
		description: "Minimum value for the control.",
	},
	name: {
		description: "Serializes the invariant numeric value through a hidden form control.",
	},
	open: {
		default: "false",
		description: "Open state for the popup or disclosure. Bind with `bind:open`.",
	},
	ondismiss: {
		description: "Called after the toast is dismissed.",
	},
	onValueChange: {
		description:
			"Runs after each accepted numeric value change with its reason, previous value, and source event.",
	},
	onValueCommit: {
		description:
			"Runs once when a semantic input, keyboard, pointer, wheel, scrub, or reset transaction commits.",
	},
	onComplete: {
		description: "Runs once when every one-time-code cell contains a character.",
	},
	options: {
		default: "[]",
		description: "Options rendered by the component's built-in fallback composition.",
	},
	orientation: {
		default: '"horizontal"',
		description: "Layout direction for the component.",
	},
	page: {
		default: "2",
		description: "Current page. Bind with `bind:page`.",
	},
	pages: {
		default: "5",
		description: "Total number of pages to render when count is not provided.",
	},
	perPage: {
		description: "Items per page used with count to calculate page totals.",
	},
	placeholder: {
		default: '"Search"',
		description: "Placeholder text shown by the built-in input.",
	},
	previousMonthLabel: {
		default: '"Previous month"',
		description: "Accessible label for the previous-month navigation button.",
	},
	nextMonthLabel: {
		default: '"Next month"',
		description: "Accessible label for the next-month navigation button.",
	},
	pressed: {
		default: "false",
		description: "Pressed state for the toggle. Bind with `bind:pressed`.",
	},
	required: {
		default: "false",
		description: "Marks the field or label as required.",
	},
	readonly: {
		default: "false",
		description: "Keeps the input focusable while preventing value changes.",
	},
	ref: {
		default: "null",
		description: "Bindable reference to the visible text input.",
	},
	scope: {
		default: '"col"',
		description: "Scope attribute forwarded to the table header cell.",
	},
	showIcon: {
		default: "false",
		description: "Shows the icon placeholder in the sidebar skeleton row.",
	},
	showOnHover: {
		default: "false",
		description: "Only reveals the menu action when the parent item is hovered or focused.",
	},
	showTrigger: {
		default: "false",
		description: "Shows a trigger button beside the input.",
	},
	smallStep: {
		default: "0.1",
		description: "Fine-grained increment used by Alt+Arrow keys.",
	},
	side: {
		default: '"right"',
		description: "Side from which the surface appears.",
	},
	size: {
		default: '"default"',
		description: "Size variant for the component.",
	},
	src: {
		default: '""',
		description: "Image source for the avatar.",
	},
	state: {
		description: "Visual state used by the sidebar fallback layout.",
	},
	step: {
		default: "1",
		description: "Increment used when changing slider values.",
	},
	style: {
		default: '""',
		description: "Inline style forwarded to the rendered element.",
	},
	tabs: {
		default: '["Overview", "Details"]',
		description: "Tab labels rendered by the built-in fallback layout.",
	},
	tip: {
		default: '"Tooltip"',
		description: "Fallback tooltip content.",
	},
	title: {
		default: '""',
		description: "Title text rendered by the component's built-in fallback layout.",
	},
	trigger: {
		default: '"Open"',
		description: "Fallback trigger text rendered when custom children are not provided.",
	},
	triggerProps: {
		default: "{}",
		description: "Props forwarded to the optional trigger button.",
	},
	type: {
		default: '"button"',
		description: "Behavior, selection, or HTML type passed to the underlying control.",
	},
	value: {
		default: '""',
		description: "Current value for the component. Bind with `bind:value` when supported.",
	},
	allowWheelScrub: {
		default: "false",
		description: "Allows focused wheel gestures to change the number.",
	},
	alignOffset: {
		default: "0",
		description: "Offsets the popup from its preferred alignment in pixels.",
	},
	closeOnSelect: {
		default: "true",
		description: "Closes the context menu after the item is selected.",
	},
	download: {
		description: "Forwards the anchor download attribute to a link item.",
	},
	hreflang: {
		description: "Declares the language of a link item's destination.",
	},
	inset: {
		default: "false",
		description: "Adds leading space so the item aligns with rows that render an indicator.",
	},
	invalid: {
		default: "false",
		description: "Marks the component invalid independently of parse validity.",
	},
	loop: {
		default: "true",
		description: "Wraps keyboard focus from the last menu item to the first and back.",
	},
	locale: {
		default: '"en-US"',
		description: "Locale used for deterministic numeric parsing and formatting.",
	},
	openDelay: {
		default: "100",
		description: "Delays pointer-triggered submenu opening by this many milliseconds.",
	},
	portalProps: {
		default: "{}",
		description:
			"Configures the exact Bits Portal target (`to`) or renders inline when `disabled`.",
	},
	preventScroll: {
		default: "true",
		description: "Locks document scrolling while the root popup is open.",
	},
	referrerpolicy: {
		description: "Controls referrer information sent when a link item is followed.",
	},
	rel: {
		description: "Describes the relationship between a link item and its destination.",
	},
	sideOffset: {
		default: "2",
		description: "Sets the distance between the pointer anchor and popup in pixels.",
	},
	target: {
		description: "Chooses the browsing context used by a link item.",
	},
	textValue: {
		description: "Provides plain text for keyboard typeahead when item content is complex.",
	},
	variant: {
		default: '"default"',
		description: "Visual variant for the component.",
	},
};

/** @type {Record<string, Record<string, Partial<CuratedProp>>>} */
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
	ContextMenuCheckboxItem: {
		checked: { default: "false" },
		indeterminate: { default: "false" },
		variant: { default: '"default"' },
	},
	ContextMenuItem: {
		variant: { default: '"default"' },
	},
	ContextMenuLinkItem: {
		href: { default: undefined },
		variant: { default: '"default"' },
	},
	ContextMenuPopup: {
		align: {
			default: '"center"',
			description: "Aligns the popup with the virtual pointer anchor.",
		},
		collisionPadding: {
			default: "8",
			description: "Keeps the popup inset from viewport collision boundaries.",
		},
		escapeKeydownBehavior: {
			default: '"defer-otherwise-close"',
			description: "Defers to an open submenu Escape layer before closing the root menu.",
		},
		interactOutsideBehavior: { default: '"close"' },
		side: { default: '"bottom"' },
		sideOffset: { default: "4" },
	},
	ContextMenuRadioGroup: {
		value: { default: '""', description: "Selected radio item value." },
	},
	ContextMenuRadioItem: {
		value: {
			default: undefined,
			description: "Value selected by this radio item.",
		},
	},
	ContextMenuSubPopup: {
		align: {
			default: '"start"',
			description: "Aligns the submenu with its trigger.",
		},
		alignOffset: {
			default: "-5 (0 when align is center)",
			description: "Offsets non-centered submenu alignment toward its parent row.",
		},
		collisionPadding: {
			default: "8",
			description: "Keeps the submenu inset from viewport collision boundaries.",
		},
		escapeKeydownBehavior: {
			default: '"close"',
			description: "Closes this submenu before the root menu and restores focus to its trigger.",
		},
		interactOutsideBehavior: { default: '"defer-otherwise-close"' },
		side: {
			default: '"right" in LTR; "left" in RTL',
			description: "Places the submenu at logical inline-end unless explicitly overridden.",
		},
		sideOffset: { default: "0" },
	},
	DatePicker: { label: { default: '"Pick a date"' }, value: { default: undefined } },
	GroupSeparator: { orientation: { default: '"vertical"' } },
	Input: { type: { default: '"text"' }, value: { default: undefined } },
	InputGroupInput: { type: { default: '"text"' } },
	Menu: { label: { default: '"Menu"' } },
	Meter: { value: { default: "70" } },
	NumberField: {
		label: {
			default: '"Number" outside Field',
			description:
				"Visible scrub label and accessible name; an enclosing Field label is used when omitted.",
		},
		max: { default: undefined },
		min: { default: undefined },
		ref: { description: "Bindable reference to the owned root div." },
		size: { default: '"default"' },
		step: {
			description:
				"Discrete increment for keys, buttons, wheel, and scrubbing; direct text is not snapped.",
		},
		value: {
			default: "defaultValue",
			description:
				"Current finite numeric value. External writes are displayed without callbacks or silent clamping.",
		},
	},
	NumberFieldDecrement: {
		ref: { description: "Bindable reference to the decrement button." },
	},
	NumberFieldGroup: {
		ref: { description: "Bindable reference to the presentational group div." },
	},
	NumberFieldIncrement: {
		ref: { description: "Bindable reference to the increment button." },
	},
	NumberFieldInput: {
		ref: { description: "Bindable reference to the visible spinbutton input." },
	},
	NumberFieldScrubArea: {
		label: {
			default: undefined,
			description:
				"Required non-empty accessible label; custom children replace only its visual contents.",
		},
		ref: { description: "Bindable reference to the scrub-area wrapper." },
	},
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
	ToggleGroup: {},
	ToolbarGroup: {},
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

/** @type {Record<string, string>} */
const elementDescriptions = {
	ContextMenuCheckboxItem:
		"Renders a bindable checkbox action with either a checkmark or switch presentation.",
	ContextMenuGroup: "Groups related contextual actions without adding another interactive layer.",
	ContextMenuGroupLabel: "Labels a related group of contextual actions.",
	ContextMenuItem: "Renders a selectable contextual action with default or destructive styling.",
	ContextMenuLinkItem:
		"Renders a menu item as a semantic anchor while preserving menu keyboard behavior.",
	ContextMenuPopup:
		"Portals and positions the contextual menu surface at the pointer or keyboard anchor.",
	ContextMenuRadioGroup: "Coordinates one selected value across related radio menu items.",
	ContextMenuRadioItem: "Renders one bindable single-choice action within a radio group.",
	ContextMenuSeparator: "Visually separates groups of contextual actions.",
	ContextMenuShortcut: "Displays a semantic keyboard shortcut hint aligned to an item.",
	ContextMenuSub: "Provides independent open state for a nested contextual menu.",
	ContextMenuSubPopup: "Portals and positions the floating surface for a nested menu.",
	ContextMenuSubTrigger: "Opens a nested contextual menu with pointer or keyboard input.",
	ContextMenuTrigger:
		"Defines the right-click target and opens from Shift+F10 or the Context Menu key.",
	NumberFieldDecrement:
		"Decreases the shared value, including press-and-hold repetition and bound handling.",
	NumberFieldGroup:
		"Groups the input and step controls into one focus-ring and validation surface.",
	NumberFieldIncrement:
		"Increases the shared value, including press-and-hold repetition and bound handling.",
	NumberFieldInput: "Renders the locale-aware text input with accessible spinbutton semantics.",
	NumberFieldScrubArea:
		"Labels the input and supports horizontal pointer scrubbing on fine pointers.",
};

/**
 * @param {string} rootName
 * @param {string} elementName
 */
function descriptionForElement(rootName, elementName) {
	if (elementName === rootName) {
		const metadata = metadataByName[rootName];
		return metadata.status === "deferred"
			? "This deferred component does not publish an implemented Svelte API."
			: metadata.description;
	}

	if (elementDescriptions[elementName]) {
		return elementDescriptions[elementName];
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
 * @returns {CuratedProp}
 */
function propForName(elementName, name) {
	const metadata = {
		...(propMetadata[name] ?? {
			description: `Configures the ${name} behavior for this component.`,
		}),
		...(propOverridesByElement[elementName]?.[name] ?? {}),
	};

	return metadata;
}

/**
 * @param {string} name
 * @returns {ApiContract[]}
 */
function contractsForComponent(name) {
	const elements = [name, ...(partsByName[name] ?? [])];

	return elements.map((elementName) => ({
		name: elementName,
		description: descriptionForElement(name, elementName),
		ownProps: Object.fromEntries(
			implementedElements.has(elementName)
				? (customPropsByElement[elementName] ?? []).map((propName) => [
						propName,
						propForName(elementName, propName),
					])
				: []
		),
		signatureProps: signaturePropsByElement[elementName],
	}));
}

/** @type {Record<string, string[]>} */
const signaturePropsByElement = {
	Accordion: ["type", "value", "onValueChange"],
	Autocomplete: ["type", "value", "onValueChange"],
	Button: ["href", "type", "target", "download", "form", "disabled"],
	Calendar: ["type", "value", "onValueChange"],
	Combobox: ["type", "value", "onValueChange"],
	ContextMenu: ["open", "onOpenChange", "onOpenChangeComplete", "dir"],
	ContextMenuCheckboxItem: ["checked", "onCheckedChange", "indeterminate", "onIndeterminateChange"],
	ContextMenuRadioGroup: ["value", "onValueChange"],
	ContextMenuSub: ["open", "onOpenChange", "onOpenChangeComplete"],
	Select: ["type", "value", "onValueChange"],
	Slider: ["type", "value", "onValueChange", "onValueCommit"],
	NumberField: ["value", "onValueChange", "onValueCommit"],
	ToggleGroup: ["type", "value", "onValueChange"],
};

/** @type {Record<string, ApiContract[]>} */
export const apiContracts = Object.fromEntries(
	Object.keys(metadataByName).map((name) => [name, contractsForComponent(name)])
);
