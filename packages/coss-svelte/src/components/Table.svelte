<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div data-slot="table-wrap" class="cn-table-wrap">
	<table data-slot="table" class={cn("cn-table", className)} {...rest}>
		{@render children?.()}
	</table>
</div>
