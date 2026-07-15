<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SelectPrimitive.Value>, "children" | "child"> & {
	class?: string;
	children?: ComponentProps<typeof SelectPrimitive.Value>["children"];
};

let { class: className = "", children: valueChildren = undefined, ...rest }: Props = $props();
</script>

{#if valueChildren}
	<SelectPrimitive.Value
		data-slot="select-value"
		class={cn("cn-select-value", className)}
		{...rest}
	>
		{#snippet children(props)}
			{@render valueChildren?.(props)}
		{/snippet}
	</SelectPrimitive.Value>
{:else}
	<SelectPrimitive.Value
		data-slot="select-value"
		class={cn("cn-select-value", className)}
		{...rest}
	/>
{/if}
