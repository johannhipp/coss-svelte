import {
	type Button,
	type Calendar,
	type ContextMenu,
	type ContextMenuCheckboxItem,
	type ContextMenuGroup,
	type ContextMenuGroupLabel,
	type ContextMenuItem,
	type ContextMenuLinkItem,
	type ContextMenuPopup,
	type ContextMenuRadioGroup,
	type ContextMenuRadioItem,
	type ContextMenuSeparator,
	type ContextMenuShortcut,
	type ContextMenuSub,
	type ContextMenuSubPopup,
	type ContextMenuSubTrigger,
	type ContextMenuTrigger,
	cn,
	type Field,
	type NumberField,
	type NumberFieldDecrement,
	type NumberFieldGroup,
	type NumberFieldIncrement,
	type NumberFieldInput,
	type NumberFieldScrubArea,
} from "coss-svelte";
import { componentMetadata } from "coss-svelte/metadata";
import type { ComponentProps, Snippet } from "svelte";

type ButtonProps = ComponentProps<typeof Button>;
const buttonProps: ButtonProps = {
	variant: "primary",
	children: (() => {}) as Snippet,
};

// @ts-expect-error Button variants are a closed public union.
const invalidButtonProps: ButtonProps = { variant: "not-a-variant" };

type CalendarProps = ComponentProps<typeof Calendar>;
const calendarProps: CalendarProps = { type: "single" };
const fieldProps: ComponentProps<typeof Field> = { children: (() => {}) as Snippet };
type NumberFieldProps = ComponentProps<typeof NumberField>;
const numberFieldProps: NumberFieldProps = {
	value: null,
	size: "default",
	locale: "de-DE",
	format: { style: "unit", unit: "kilogram" },
	onValueChange: (_value, details) => {
		const reason: "input" | "increment" | "decrement" | "keyboard" | "wheel" | "scrub" | "reset" =
			details.reason;
		const previousValue: number | null = details.previousValue;
		const sourceEvent: Event | null = details.sourceEvent;
		void reason;
		void previousValue;
		void sourceEvent;
	},
	children: (() => {}) as Snippet,
};
const numberFieldGroupProps: ComponentProps<typeof NumberFieldGroup> = {
	ref: null,
	children: (() => {}) as Snippet,
};
const numberFieldInputProps: ComponentProps<typeof NumberFieldInput> = {
	ref: null,
	autocomplete: "off",
};
const numberFieldIncrementProps: ComponentProps<typeof NumberFieldIncrement> = {
	ref: null,
	"aria-label": "Add one",
};
const numberFieldDecrementProps: ComponentProps<typeof NumberFieldDecrement> = {
	ref: null,
	"aria-label": "Remove one",
};
const numberFieldScrubAreaProps: ComponentProps<typeof NumberFieldScrubArea> = {
	label: "Quantity",
	ref: null,
};

// @ts-expect-error Number Field sizes are a closed public union.
const invalidNumberFieldProps: NumberFieldProps = { size: "extra-large" };
// @ts-expect-error Number Field Input does not own form serialization.
const invalidNumberFieldInputProps: ComponentProps<typeof NumberFieldInput> = { name: "quantity" };
// @ts-expect-error Number Field Scrub Area requires its accessible label.
const invalidNumberFieldScrubAreaProps: ComponentProps<typeof NumberFieldScrubArea> = {};

type ContextMenuItemProps = ComponentProps<typeof ContextMenuItem>;
const contextMenuProps: ComponentProps<typeof ContextMenu> = {
	open: false,
	dir: "rtl",
	onOpenChange: (_open) => {},
	children: (() => {}) as Snippet,
};
const contextMenuTriggerProps: ComponentProps<typeof ContextMenuTrigger> = {
	ref: null,
	tabindex: 0,
	"aria-label": "File actions",
	children: (() => {}) as Snippet,
};
const contextMenuPopupProps: ComponentProps<typeof ContextMenuPopup> = {
	ref: null,
	side: "bottom",
	align: "center",
	sideOffset: 4,
	escapeKeydownBehavior: "defer-otherwise-close",
	portalProps: { to: "#context-portal", disabled: false },
	children: (() => {}) as Snippet,
};
const contextMenuItemProps: ContextMenuItemProps = {
	variant: "destructive",
	inset: true,
	closeOnSelect: false,
	onSelect: (_event) => {},
	children: (() => {}) as Snippet,
};
const contextMenuCheckboxItemProps: ComponentProps<typeof ContextMenuCheckboxItem> = {
	checked: false,
	indeterminate: true,
	variant: "switch",
	onCheckedChange: (_checked) => {},
	onIndeterminateChange: (_indeterminate) => {},
	children: (() => {}) as Snippet,
};
const contextMenuGroupProps: ComponentProps<typeof ContextMenuGroup> = {
	ref: null,
	children: (() => {}) as Snippet,
};
const contextMenuGroupLabelProps: ComponentProps<typeof ContextMenuGroupLabel> = {
	ref: null,
	inset: true,
	children: (() => {}) as Snippet,
};
const contextMenuRadioGroupProps: ComponentProps<typeof ContextMenuRadioGroup> = {
	value: "name",
	onValueChange: (_value) => {},
	children: (() => {}) as Snippet,
};
const contextMenuRadioItemProps: ComponentProps<typeof ContextMenuRadioItem> = {
	value: "date",
	children: (() => {}) as Snippet,
};
const contextMenuSeparatorProps: ComponentProps<typeof ContextMenuSeparator> = {
	ref: null,
};
const contextMenuShortcutProps: ComponentProps<typeof ContextMenuShortcut> = {
	ref: null,
	children: (() => {}) as Snippet,
};
const contextMenuSubProps: ComponentProps<typeof ContextMenuSub> = {
	open: false,
	onOpenChange: (_open) => {},
	children: (() => {}) as Snippet,
};
const contextMenuSubTriggerProps: ComponentProps<typeof ContextMenuSubTrigger> = {
	ref: null,
	openDelay: 100,
	children: (() => {}) as Snippet,
};
const contextMenuSubPopupProps: ComponentProps<typeof ContextMenuSubPopup> = {
	ref: null,
	side: "left",
	escapeKeydownBehavior: "close",
	portalProps: { disabled: true },
	children: (() => {}) as Snippet,
};

// @ts-expect-error Context Menu item variants are a closed public union.
const invalidContextMenuItemProps: ContextMenuItemProps = { variant: "warning" };

type ContextMenuLinkItemProps = ComponentProps<typeof ContextMenuLinkItem>;
const contextMenuLinkItemProps: ContextMenuLinkItemProps = {
	href: "/settings",
	target: "_blank",
	rel: "noreferrer",
	ref: null,
	children: (() => {}) as Snippet,
};
const contextMenuAnchorRef: ContextMenuLinkItemProps["ref"] = null;

// @ts-expect-error Context Menu Link Item requires an href.
const invalidContextMenuLinkItemProps: ContextMenuLinkItemProps = {};
const invalidContextMenuPortalContainer: ComponentProps<typeof ContextMenuPopup> = {
	// @ts-expect-error Context Menu portals expose Bits' exact to/disabled surface.
	portalProps: { container: "#context-portal" },
};
const invalidContextMenuPortalChildren: ComponentProps<typeof ContextMenuSubPopup> = {
	// @ts-expect-error Context Menu portals do not accept caller-owned children.
	portalProps: { children: (() => {}) as Snippet },
};
const invalidContextMenuPortalKeepMounted: ComponentProps<typeof ContextMenuPopup> = {
	// @ts-expect-error Context Menu portals do not expose a keepMounted alias.
	portalProps: { keepMounted: true },
};

const className: string = cn("cn-button", buttonProps.class, fieldProps.class);
const metadataName: string = componentMetadata.Button.name;

void invalidButtonProps;
void invalidNumberFieldProps;
void invalidNumberFieldInputProps;
void invalidNumberFieldScrubAreaProps;
void invalidContextMenuItemProps;
void invalidContextMenuLinkItemProps;
void invalidContextMenuPortalContainer;
void invalidContextMenuPortalChildren;
void invalidContextMenuPortalKeepMounted;
void calendarProps;
void contextMenuProps;
void contextMenuTriggerProps;
void contextMenuPopupProps;
void contextMenuItemProps;
void contextMenuCheckboxItemProps;
void contextMenuGroupProps;
void contextMenuGroupLabelProps;
void contextMenuLinkItemProps;
void contextMenuAnchorRef;
void contextMenuRadioGroupProps;
void contextMenuRadioItemProps;
void contextMenuSeparatorProps;
void contextMenuShortcutProps;
void contextMenuSubProps;
void contextMenuSubTriggerProps;
void contextMenuSubPopupProps;
void numberFieldProps;
void numberFieldGroupProps;
void numberFieldInputProps;
void numberFieldIncrementProps;
void numberFieldDecrementProps;
void numberFieldScrubAreaProps;
void className;
void metadataName;
