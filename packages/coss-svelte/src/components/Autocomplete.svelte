<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { getFieldContext, mergeFieldIds } from "../internal/field-context.svelte.js";
import { type NormalizedOption, normalizeOptions, type Option } from "../internal/props.js";
import { cn } from "../utils.js";
import AutocompleteList from "./AutocompleteList.svelte";
import AutocompletePopup from "./AutocompletePopup.svelte";

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
let search = $state("");
let filteredItems: NormalizedOption[] = $derived.by(() => {
	const query = search.trim().toLowerCase();
	if (query === "") return items;
	return items.filter((item) => item.label.toLowerCase().includes(query));
});

$effect(() => {
	if (!open) search = "";
});
let resolvedControlId = $derived(props.id ?? field?.controlId ?? generatedId);
let resolvedDisabled = $derived(props.disabled ?? field?.disabled ?? false);
let resolvedRequired = $derived(props.required ?? field?.required ?? false);
let describedBy = $derived(mergeFieldIds(props["aria-describedby"], field?.describedBy));
let resolvedInvalid = $derived(props["aria-invalid"] ?? (field?.invalid ? "true" : undefined));

function singleValue(value: Props["value"]): string | undefined {
	if (value === undefined || typeof value === "string") return value;
	throw new TypeError('Autocomplete type="single" requires a string value.');
}

function multipleValue(value: Props["value"]): string[] | undefined {
	if (value === undefined || Array.isArray(value)) return value;
	throw new TypeError('Autocomplete type="multiple" requires a string[] value.');
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
		<div data-slot="autocomplete" class={cn("cn-autocomplete", props.class)}>
			<ComboboxPrimitive.Input
				id={resolvedControlId}
				data-slot="autocomplete-input"
				class="cn-autocomplete-input"
				placeholder={props.placeholder ?? "Search"}
				aria-label={props["aria-label"]}
				aria-labelledby={props["aria-labelledby"]}
				aria-describedby={describedBy}
				aria-invalid={resolvedInvalid}
				disabled={resolvedDisabled}
				required={resolvedRequired}
				onfocus={() => {
					open = true;
				}}
				oninput={(event) => {
					search = event.currentTarget.value;
					open = true;
				}}
			/>
			<AutocompletePopup>
				<AutocompleteList>
					{#if filteredItems.length === 0}
						<div data-slot="autocomplete-empty" class="cn-autocomplete-empty">No items found.</div>
					{/if}
					{#key search}
						{#each filteredItems as item (item.value)}
						<ComboboxPrimitive.Item
							data-slot="autocomplete-item"
							class="cn-autocomplete-item"
							value={item.value}
							label={item.label}
							disabled={item.disabled}
						>
							{item.label}
						</ComboboxPrimitive.Item>
						{/each}
					{/key}
				</AutocompleteList>
			</AutocompletePopup>
		</div>
	{/if}
{/snippet}

{#if props.type === "multiple"}
	<ComboboxPrimitive.Root
		{...multipleRootProps(props)}
		type="multiple"
		value={multipleValue(value)}
		bind:open
		items={filteredItems}
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
		items={filteredItems}
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
