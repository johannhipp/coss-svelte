<script lang="ts">
import { cn } from "../utils.js";

type Scope = "row" | "rowgroup" | "col" | "colgroup";
let {
	scope = "col",
	class: className = "",
	children,
	...rest
}: { scope?: Scope; class?: string; children?: import("svelte").Snippet } = $props();
</script>

<th data-slot="table-head" class={cn("cn-table-head", className)} {scope} {...rest}>
	{@render children?.()}
</th>
