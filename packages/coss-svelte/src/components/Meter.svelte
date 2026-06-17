<script>
import { Meter as MeterPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	class: className = "",
	value = 70,
	min = 0,
	max = 100,
	label = "",
	children,
	style = "",
	...rest
} = $props();

let percentage = $derived(Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100)));
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
