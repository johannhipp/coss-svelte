<script>
import PaginationLink from "./PaginationLink.svelte";

let { children, ...rest } = $props();
</script>

<PaginationLink data-slot="pagination-next" aria-label="Go to next page" {...rest}>
	<span>
		{#if children}
			{@render children()}
		{:else}
			Next
		{/if}
	</span>
	<span aria-hidden="true">›</span>
</PaginationLink>
