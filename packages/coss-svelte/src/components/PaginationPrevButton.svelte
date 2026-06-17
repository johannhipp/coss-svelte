<script>
import { Pagination as PaginationPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<PaginationPrimitive.PrevButton
	data-slot="pagination-prev-button"
	class={cn("cn-pagination-button", className)}
	{...rest}
>
	{@render children?.()}
</PaginationPrimitive.PrevButton>
