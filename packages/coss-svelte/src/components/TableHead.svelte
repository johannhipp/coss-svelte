<script>
import { cn } from "../utils.js";

let { scope = "col", class: className = "", children, ...rest } = $props();
</script>

<th data-slot="table-head" class={cn("cn-table-head", className)} {scope} {...rest}>
	{@render children?.()}
</th>
