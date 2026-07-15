<script>
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { open = $bindable(false), title = "", class: className = "", children, ...rest } = $props();
</script>

<CollapsiblePrimitive.Root
	data-slot="collapsible"
	class={cn("cn-collapsible", className)}
	bind:open
	{...rest}
>
	{#if title}
		<CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" class="cn-collapsible-trigger">
			{title}
		</CollapsiblePrimitive.Trigger>
		<CollapsiblePrimitive.Content
			data-slot="collapsible-content"
			class="cn-collapsible-content"
			forceMount
		>
			<div class="cn-collapsible-content-inner">
				{@render children?.()}
			</div>
		</CollapsiblePrimitive.Content>
	{:else}
		{@render children?.()}
	{/if}
</CollapsiblePrimitive.Root>
