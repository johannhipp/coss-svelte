<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import PaginationLink from "./PaginationLink.svelte";

let { children, href, ...rest }: NativeProps & { href?: string } = $props();
</script>

<PaginationLink data-slot="pagination-next" aria-label="Go to next page" {href} {...rest}>
	<span>
		{#if children}
			{@render children()}
		{:else}
			Next
		{/if}
	</span>
	<span aria-hidden="true">›</span>
</PaginationLink>
