<script lang="ts">
import { Pagination as PaginationPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof PaginationPrimitive.Root>;
type PaginationChildProps = Parameters<NonNullable<RootProps["children"]>>[0];
type Props = Omit<RootProps, "children" | "child" | "count"> & {
	page?: number;
	pages?: number;
	count?: number;
	perPage?: number;
	class?: string;
	children?: Snippet<[PaginationChildProps]>;
};

let {
	ref = $bindable(null),
	page = $bindable(2),
	pages: totalPages = 5,
	count = totalPages,
	perPage = 1,
	class: className = "",
	children: rootChildren,
	...rest
}: Props = $props();
</script>

<PaginationPrimitive.Root
	bind:ref
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
