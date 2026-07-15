import { type Button, type Calendar, cn, type Field } from "coss-svelte";
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

const className: string = cn("cn-button", buttonProps.class, fieldProps.class);
const metadataName: string = componentMetadata.Button.name;

void invalidButtonProps;
void calendarProps;
void className;
void metadataName;
