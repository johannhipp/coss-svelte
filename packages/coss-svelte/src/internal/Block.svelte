<script>
import { cn } from "../utils.js";

let { as = "div", dataSlot = "", class: className = "", children, ...rest } = $props();
</script>

<svelte:element this={as} data-slot={dataSlot || undefined} class={cn(className)} {...rest}>
	{@render children?.()}
</svelte:element>
