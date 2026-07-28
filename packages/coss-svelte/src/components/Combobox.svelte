<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { getFieldContext, mergeFieldIds } from "../internal/field-context.svelte.js";
import { type NormalizedOption, normalizeOptions, type Option } from "../internal/props.js";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof ComboboxPrimitive.Root>;
type PrimitiveSingleProps = Extract<RootProps, { type: "single" }>;
type PrimitiveMultipleProps = Extract<RootProps, { type: "multiple" }>;
type InputAccessibilityProps = Pick<
	ComponentProps<typeof ComboboxPrimitive.Input>,
	"id" | "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid"
>;
type ConvenienceProps = InputAccessibilityProps & {
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
	throw new TypeError('Combobox type="single" requires a string value.');
}

function multipleValue(value: Props["value"]): string[] | undefined {
	if (value === undefined || Array.isArray(value)) return value;
	throw new TypeError('Combobox type="multiple" requires a string[] value.');
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
		<div class={cn("cn-combobox", props.class)}>
			{@render props.children()}
		</div>
	{:else}
		<div data-slot="combobox" class={cn("cn-combobox", props.class)}>
			<span data-slot="combobox-input-group" class="cn-combobox-input-group">
				<span data-slot="combobox-input-control" class="cn-combobox-input-control">
					<ComboboxPrimitive.Input
						id={resolvedControlId}
						data-slot="combobox-input"
						class="cn-combobox-input"
						placeholder={props.placeholder ?? "Choose"}
						aria-label={props["aria-label"]}
						aria-labelledby={props["aria-labelledby"]}
						aria-describedby={describedBy}
						aria-invalid={resolvedInvalid}
						disabled={resolvedDisabled}
						required={resolvedRequired}
					/>
					<ComboboxPrimitive.Trigger
						data-slot="combobox-trigger"
						class="cn-combobox-input-trigger"
						aria-label={props["aria-label"]
							? `${props["aria-label"]} options`
							: "Show options"}
					>
						<span data-slot="combobox-icon" class="cn-combobox-icon" aria-hidden="true">
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
					</ComboboxPrimitive.Trigger>
				</span>
			</span>
			<ComboboxPrimitive.Portal>
				<ComboboxPrimitive.Content data-slot="combobox-popup" class="cn-combobox-popup">
					<ComboboxPrimitive.Viewport data-slot="combobox-list" class="cn-combobox-list">
						{#each items as item}
							<ComboboxPrimitive.Item
								data-slot="combobox-item"
								class="cn-combobox-item"
								value={item.value}
								label={item.label}
								disabled={item.disabled}
							>
								{item.label}
							</ComboboxPrimitive.Item>
						{/each}
					</ComboboxPrimitive.Viewport>
				</ComboboxPrimitive.Content>
			</ComboboxPrimitive.Portal>
		</div>
	{/if}
{/snippet}

{#if props.type === "multiple"}
	<ComboboxPrimitive.Root
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
	</ComboboxPrimitive.Root>
{:else}
	<ComboboxPrimitive.Root
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
	</ComboboxPrimitive.Root>
{/if}
