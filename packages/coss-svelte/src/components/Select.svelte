<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { getFieldContext, mergeFieldIds } from "../internal/field-context.svelte.js";
import { type NormalizedOption, normalizeOptions, type Option } from "../internal/props.js";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof SelectPrimitive.Root>;
type PrimitiveSingleProps = Extract<RootProps, { type: "single" }>;
type PrimitiveMultipleProps = Extract<RootProps, { type: "multiple" }>;
type TriggerAccessibilityProps = Pick<
	ComponentProps<typeof SelectPrimitive.Trigger>,
	"id" | "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid"
>;
type ConvenienceProps = TriggerAccessibilityProps & {
	options?: Option[];
	placeholder?: string;
	class?: string;
	children?: Snippet;
};
type SingleProps = Omit<PrimitiveSingleProps, "children" | "onValueChange" | "type" | "value"> &
	ConvenienceProps & {
		type?: "single";
		value?: string;
		onValueChange?: PrimitiveSingleProps["onValueChange"];
	};
type MultipleProps = Omit<PrimitiveMultipleProps, "children" | "onValueChange" | "type" | "value"> &
	ConvenienceProps & {
		type: "multiple";
		value?: string[];
		onValueChange?: PrimitiveMultipleProps["onValueChange"];
	};
type Props = SingleProps | MultipleProps;

let { value = $bindable(), open = $bindable(false), ...props }: Props = $props();

const generatedId = $props.id();
const field = getFieldContext();
let items: NormalizedOption[] = $derived(normalizeOptions(props.items ?? props.options ?? []));
let resolvedControlId = $derived(props.id ?? field?.controlId ?? generatedId);
let resolvedDisabled = $derived(props.disabled ?? field?.disabled ?? false);
let resolvedRequired = $derived(props.required ?? field?.required ?? false);
let describedBy = $derived(mergeFieldIds(props["aria-describedby"], field?.describedBy));
let resolvedInvalid = $derived(props["aria-invalid"] ?? (field?.invalid ? "true" : undefined));

function singleValue(value: Props["value"]): string | undefined {
	if (value === undefined || typeof value === "string") return value;
	throw new TypeError('Select type="single" requires a string value.');
}

function multipleValue(value: Props["value"]): string[] | undefined {
	if (value === undefined || Array.isArray(value)) return value;
	throw new TypeError('Select type="multiple" requires a string[] value.');
}

function singleRootProps(props: Omit<SingleProps, "open" | "value">) {
	const {
		options: _options,
		placeholder: _placeholder,
		class: _class,
		id: _id,
		children: _children,
		items: _items,
		type: _type,
		onValueChange: _onValueChange,
		disabled: _disabled,
		required: _required,
		"aria-label": _ariaLabel,
		"aria-labelledby": _ariaLabelledBy,
		"aria-describedby": _ariaDescribedBy,
		"aria-invalid": _ariaInvalid,
		...rootProps
	} = props;
	return rootProps;
}

function multipleRootProps(props: Omit<MultipleProps, "open" | "value">) {
	const {
		options: _options,
		placeholder: _placeholder,
		class: _class,
		id: _id,
		children: _children,
		items: _items,
		type: _type,
		onValueChange: _onValueChange,
		disabled: _disabled,
		required: _required,
		"aria-label": _ariaLabel,
		"aria-labelledby": _ariaLabelledBy,
		"aria-describedby": _ariaDescribedBy,
		"aria-invalid": _ariaInvalid,
		...rootProps
	} = props;
	return rootProps;
}
</script>

{#snippet content()}
	{#if props.children}
		{@render props.children()}
	{:else}
		<SelectPrimitive.Trigger
			id={resolvedControlId}
			data-slot="select-trigger"
			class={cn("cn-select-trigger", props.class)}
			aria-label={props["aria-label"]}
			aria-labelledby={props["aria-labelledby"]}
			aria-describedby={describedBy}
			aria-invalid={resolvedInvalid}
			aria-required={resolvedRequired ? "true" : undefined}
			disabled={resolvedDisabled}
		>
			<SelectPrimitive.Value
				data-slot="select-value"
				class="cn-select-value"
				placeholder={props.placeholder ?? "Select"}
			/>
			<span data-slot="select-icon" class="cn-select-icon">
				<svg
					aria-hidden="true"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="m7 15 5 5 5-5" />
					<path d="m7 9 5-5 5 5" />
				</svg>
			</span>
		</SelectPrimitive.Trigger>
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content data-slot="select-popup" class="cn-select-popup">
				<SelectPrimitive.Viewport data-slot="select-viewport" class="cn-select-viewport">
					{#each items as item}
						<SelectPrimitive.Item
							data-slot="select-item"
							class="cn-select-item"
							value={item.value}
							label={item.label}
							disabled={item.disabled}
						>
							{item.label}
						</SelectPrimitive.Item>
					{/each}
				</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	{/if}
{/snippet}

{#if props.type === "multiple"}
	<SelectPrimitive.Root
		{...multipleRootProps(props)}
		type="multiple"
		value={multipleValue(value)}
		bind:open
		{items}
		disabled={resolvedDisabled}
		required={resolvedRequired}
		onValueChange={(next) => {
			value = next;
			props.onValueChange?.(next);
		}}
	>
		{@render content()}
	</SelectPrimitive.Root>
{:else}
	<SelectPrimitive.Root
		{...singleRootProps(props)}
		type="single"
		value={singleValue(value)}
		bind:open
		{items}
		disabled={resolvedDisabled}
		required={resolvedRequired}
		onValueChange={(next) => {
			value = next;
			props.onValueChange?.(next);
		}}
	>
		{@render content()}
	</SelectPrimitive.Root>
{/if}
