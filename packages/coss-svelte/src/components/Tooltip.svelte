<script lang="ts">
import { Tooltip as TooltipPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import TooltipPopup from "./TooltipPopup.svelte";

type RootProps = ComponentProps<typeof TooltipPrimitive.Root>;
type Props = Omit<RootProps, "children" | "child"> & {
	label?: string;
	tip?: string;
	class?: string;
	children?: RootProps["children"];
};

let {
	open = $bindable(false),
	triggerId = $bindable(null),
	label = "Hover",
	tip = "Tooltip",
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

{#if children}
	<TooltipPrimitive.Provider>
		<TooltipPrimitive.Root bind:open bind:triggerId {children} {...rest} />
	</TooltipPrimitive.Provider>
{:else}
	<TooltipPrimitive.Provider>
		<TooltipPrimitive.Root bind:open bind:triggerId {...rest}>
			<TooltipPrimitive.Trigger data-slot="tooltip-trigger" class="cn-tooltip-trigger">
				{label}
			</TooltipPrimitive.Trigger>
			<TooltipPopup class={className}>{tip}</TooltipPopup>
		</TooltipPrimitive.Root>
	</TooltipPrimitive.Provider>
{/if}
