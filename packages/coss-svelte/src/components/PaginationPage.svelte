<script>
import { Pagination as PaginationPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children: pageChildren, ...rest } = $props();
</script>

{#if pageChildren}
	<PaginationPrimitive.Page
		data-slot="pagination-page"
		class={cn("cn-pagination-button", className)}
		{...rest}
	>
		{@render pageChildren?.()}
	</PaginationPrimitive.Page>
{:else}
	<PaginationPrimitive.Page
		data-slot="pagination-page"
		class={cn("cn-pagination-button", className)}
		{...rest}
	/>
{/if}
