<script lang="ts">
import { Pagination as PaginationPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof PaginationPrimitive.Page>;
let {
	ref = $bindable(null),
	page,
	class: className = "",
	children: pageChildren,
	...rest
}: Props = $props();
</script>

{#if pageChildren}
	<PaginationPrimitive.Page
		bind:ref
		data-slot="pagination-page"
		class={cn("cn-pagination-button", className)}
		{page}
		{...rest}
	>
		{@render pageChildren?.()}
	</PaginationPrimitive.Page>
{:else}
	<PaginationPrimitive.Page
		bind:ref
		data-slot="pagination-page"
		class={cn("cn-pagination-button", className)}
		{page}
		{...rest}
	/>
{/if}
