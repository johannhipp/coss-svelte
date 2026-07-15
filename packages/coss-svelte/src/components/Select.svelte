<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { type NormalizedOption, normalizeOptions, type Option } from "../internal/props.js";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof SelectPrimitive.Root>;
type Props = Omit<RootProps, "children" | "items" | "type" | "value" | "open" | "onValueChange"> & {
	type?: "single" | "multiple";
	value?: string | string[];
	open?: boolean;
	onValueChange?: (value: string | string[]) => void;
	options?: Option[];
	placeholder?: string;
	class?: string;
	id?: string;
	children?: Snippet;
};

let {
	type = "single",
	value = $bindable(""),
	open = $bindable(false),
	options = [],
	placeholder = "Select",
	class: className = "",
	children: rootChildren,
	onValueChange,
	...rest
}: Props = $props();

let items: NormalizedOption[] = $derived(normalizeOptions(options));
</script>

{#snippet content()}
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		<SelectPrimitive.Trigger data-slot="select-trigger" class={cn("cn-select-trigger", className)}>
			<SelectPrimitive.Value data-slot="select-value" class="cn-select-value" {placeholder} />
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

{#if type === "multiple"}
	<SelectPrimitive.Root
		type="multiple"
		value={Array.isArray(value) ? value : []}
		bind:open
		{items}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{@render content()}
	</SelectPrimitive.Root>
{:else}
	<SelectPrimitive.Root
		type="single"
		value={typeof value === "string" ? value : ""}
		bind:open
		{items}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{@render content()}
	</SelectPrimitive.Root>
{/if}
