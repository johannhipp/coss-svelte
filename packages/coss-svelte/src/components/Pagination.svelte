<script>
import { Pagination as PaginationPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	page = $bindable(2),
	pages: totalPages = 5,
	count = totalPages,
	perPage = 1,
	class: className = "",
	children: rootChildren,
	...rest
} = $props();
</script>

<PaginationPrimitive.Root
	data-slot="pagination"
	class={cn("cn-pagination", className)}
	aria-label={rest["aria-label"] || "Pagination"}
	bind:page
	{count}
	{perPage}
	{...rest}
>
	{#snippet children({ pages, range, currentPage })}
		{#if rootChildren}
			{@render rootChildren({ pages, range, currentPage })}
		{:else}
			<PaginationPrimitive.PrevButton data-slot="pagination-prev-button" class="cn-pagination-button">
				Previous
			</PaginationPrimitive.PrevButton>
			{#each pages as pageItem}
				{#if pageItem.type === "ellipsis"}
					<span class="cn-pagination-ellipsis" aria-hidden="true">...</span>
				{:else}
					<PaginationPrimitive.Page
						data-slot="pagination-page"
						class="cn-pagination-button"
						page={pageItem}
					/>
				{/if}
			{/each}
			<PaginationPrimitive.NextButton data-slot="pagination-next-button" class="cn-pagination-button">
				Next
			</PaginationPrimitive.NextButton>
		{/if}
	{/snippet}
</PaginationPrimitive.Root>
