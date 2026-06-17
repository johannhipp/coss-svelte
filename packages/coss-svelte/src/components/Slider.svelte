<script>
import { Slider as SliderPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	type = "single",
	value = $bindable(40),
	min = 0,
	max = 100,
	step = 1,
	class: className = "",
	children: rootChildren,
	...rest
} = $props();
</script>

<SliderPrimitive.Root
	data-slot="slider"
	class={cn("cn-slider", className)}
	{type}
	bind:value
	{min}
	{max}
	{step}
	{...rest}
>
	{#snippet children({ thumbItems, tickItems })}
		{#if rootChildren}
			{@render rootChildren({ thumbItems, tickItems })}
		{:else}
			<SliderPrimitive.Range data-slot="slider-range" class="cn-slider-range" />
			{#each tickItems as tick}
				<SliderPrimitive.Tick data-slot="slider-tick" class="cn-slider-tick" index={tick.index} />
			{/each}
			{#each thumbItems as thumb}
				<SliderPrimitive.Thumb data-slot="slider-thumb" class="cn-slider-thumb" index={thumb.index} />
			{/each}
		{/if}
	{/snippet}
</SliderPrimitive.Root>
