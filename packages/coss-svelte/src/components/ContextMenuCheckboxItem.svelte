<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type ContextMenuCheckboxVariant = "default" | "switch";
type Props = Omit<
	ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>,
	"child" | "children"
> & {
	checked?: boolean;
	variant?: ContextMenuCheckboxVariant;
	class?: string;
	children?: ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>["children"];
};

let {
	checked = $bindable(false),
	variant = "default",
	class: className = "",
	children: itemChildren,
	...rest
}: Props = $props();
</script>

<ContextMenuPrimitive.CheckboxItem
	bind:checked
	data-slot="context-menu-checkbox-item"
	data-variant={variant}
	class={cn("cn-menu-item cn-menu-checkbox-item", className)}
	{...rest}
>
	{#snippet children({ checked: itemChecked, indeterminate })}
		{#if variant === "switch"}
			<span class="cn-context-menu-item-label">
				{@render itemChildren?.({ checked: itemChecked, indeterminate })}
			</span>
			<span
				class="cn-menu-item-indicator cn-context-menu-switch"
				data-state={indeterminate ? "indeterminate" : itemChecked ? "checked" : "unchecked"}
				aria-hidden="true"
			>
				<span class="cn-context-menu-switch-thumb"></span>
			</span>
		{:else}
			<span
				class="cn-menu-item-indicator cn-context-menu-check-indicator"
				data-state={indeterminate ? "indeterminate" : itemChecked ? "checked" : "unchecked"}
				aria-hidden="true"
			>
				<svg viewBox="0 0 16 16" fill="none">
					<path
						d="m3.5 8.25 2.75 2.75 6.25-6.25"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
					/>
				</svg>
			</span>
			<span class="cn-context-menu-item-label">
				{@render itemChildren?.({ checked: itemChecked, indeterminate })}
			</span>
		{/if}
	{/snippet}
</ContextMenuPrimitive.CheckboxItem>
