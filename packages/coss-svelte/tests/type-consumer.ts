import {
	type Button,
	type Calendar,
	type ContextMenuItem,
	type ContextMenuLinkItem,
	cn,
	type Field,
	type NumberField,
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
	size: "sm",
	locale: "de-DE",
	format: { style: "unit", unit: "kilogram" },
	children: (() => {}) as Snippet,
};

// @ts-expect-error Number Field sizes are a closed public union.
const invalidNumberFieldProps: NumberFieldProps = { size: "extra-large" };

type ContextMenuItemProps = ComponentProps<typeof ContextMenuItem>;
const contextMenuItemProps: ContextMenuItemProps = {
	variant: "destructive",
	inset: true,
};

// @ts-expect-error Context Menu item variants are a closed public union.
const invalidContextMenuItemProps: ContextMenuItemProps = { variant: "warning" };

type ContextMenuLinkItemProps = ComponentProps<typeof ContextMenuLinkItem>;
const contextMenuLinkItemProps: ContextMenuLinkItemProps = {
	href: "/settings",
	target: "_blank",
	rel: "noreferrer",
};

const className: string = cn("cn-button", buttonProps.class, fieldProps.class);
const metadataName: string = componentMetadata.Button.name;

void invalidButtonProps;
void invalidNumberFieldProps;
void invalidContextMenuItemProps;
void calendarProps;
void contextMenuItemProps;
void contextMenuLinkItemProps;
void numberFieldProps;
void className;
void metadataName;
