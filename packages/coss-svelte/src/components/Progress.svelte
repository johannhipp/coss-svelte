<script lang="ts">
import { Progress as ProgressPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { clampPercentage } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ProgressPrimitive.Root>, "child" | "children"> & {
	label?: string;
	children?: Snippet;
};

let {
	ref = $bindable(null),
	class: className = "",
	value = 45,
	min = 0,
	max = 100,
	label = "",
	children,
	...rest
}: Props = $props();

let percentage = $derived(clampPercentage(value, min, max));
</script>

<ProgressPrimitive.Root
	bind:ref
	data-slot="progress"
	class={cn("cn-progress", className)}
	{value}
	{min}
	{max}
	aria-label={label || rest["aria-label"] || "Progress"}
	{...rest}
>
	{#if children}
		{@render children?.()}
	{:else}
		<span class="cn-progress-indicator" style={`width: ${percentage}%`}></span>
	{/if}
	{#if label}
		<span class="cn-progress-label">{label}</span>
	{/if}
</ProgressPrimitive.Root>
