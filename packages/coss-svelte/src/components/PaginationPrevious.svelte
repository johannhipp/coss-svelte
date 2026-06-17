<script>
import PaginationLink from "./PaginationLink.svelte";

let { children, ...rest } = $props();
</script>

<PaginationLink data-slot="pagination-previous" aria-label="Go to previous page" {...rest}>
	<span aria-hidden="true">‹</span>
	<span>
		{#if children}
			{@render children()}
		{:else}
			Previous
		{/if}
	</span>
</PaginationLink>
