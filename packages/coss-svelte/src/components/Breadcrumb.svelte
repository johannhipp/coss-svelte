<script>
import { cn } from "../utils.js";

let { items = [], class: className = "", ...rest } = $props();
</script>

<nav data-slot="breadcrumb" class={cn("cn-breadcrumb", className)} aria-label="Breadcrumb" {...rest}>
	<ol>
		{#each items as item, index}
			<li aria-current={index === items.length - 1 ? "page" : undefined}>{item.label ?? item}</li>
		{/each}
	</ol>
</nav>
