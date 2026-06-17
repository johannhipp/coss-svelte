<script>
import { Pagination as PaginationPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<PaginationPrimitive.NextButton
	data-slot="pagination-next-button"
	class={cn("cn-pagination-button", className)}
	{...rest}
>
	{@render children?.()}
</PaginationPrimitive.NextButton>
