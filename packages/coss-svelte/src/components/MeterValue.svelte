<script lang="ts">
import { getMeterContext } from "../internal/meter-context.js";
import type { NativeProps } from "../internal/props.js";
import { clampPercentage } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
const meter = getMeterContext();
let percentage = $derived(
	meter ? Math.round(clampPercentage(meter.value, meter.min, meter.max)) : 0
);
</script>

<span data-slot="meter-value" class={cn("cn-meter-value", className)} {...rest}>
	{#if children}
		{@render children()}
	{:else}
		{percentage}%
	{/if}
</span>
