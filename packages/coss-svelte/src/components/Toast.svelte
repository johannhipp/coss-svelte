<script>
import { cn } from "../utils.js";

let { title = "Saved", description = "", class: className = "", children, ...rest } = $props();
</script>

<aside data-slot="toast" class={cn("cn-toast", className)} role="status" {...rest}>
	<strong>{title}</strong>
	{#if description}
		<p>{description}</p>
	{/if}
	{@render children?.()}
</aside>
