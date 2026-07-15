<script lang="ts">
import { Meter as MeterPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { clampPercentage } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MeterPrimitive.Root>, "children" | "child"> & {
	value?: number;
	min?: number;
	max?: number;
	label?: string;
	class?: string;
	style?: string;
	children?: Snippet;
};

let {
	class: className = "",
	value = 70,
	min = 0,
	max = 100,
	label = "",
	children,
	style = "",
	...rest
}: Props = $props();

let percentage = $derived(clampPercentage(value, min, max));
let meterStyle = $derived(`${style}; --meter-value: ${percentage}%`);
</script>

<MeterPrimitive.Root
	data-slot="meter"
	class={cn(children ? "cn-meter-root" : "cn-meter", className)}
	style={meterStyle}
	{value}
	{min}
	{max}
	aria-label={label || rest["aria-label"] || "Meter"}
	{...rest}
>
	{#if children}
		{@render children?.()}
	{:else}
		<span class="cn-meter-indicator" style={`width: ${percentage}%`}></span>
	{/if}
	{#if label}
		<span class="cn-meter-label">{label}</span>
	{/if}
</MeterPrimitive.Root>
