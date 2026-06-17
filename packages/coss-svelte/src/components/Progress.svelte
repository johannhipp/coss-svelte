<script>
import { Progress as ProgressPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	class: className = "",
	value = 45,
	min = 0,
	max = 100,
	label = "",
	children,
	...rest
} = $props();

let percentage = $derived(
	value === null ? 100 : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
);
</script>

<ProgressPrimitive.Root
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
