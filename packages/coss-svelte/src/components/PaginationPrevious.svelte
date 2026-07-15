<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import PaginationLink from "./PaginationLink.svelte";

let { children, href, ...rest }: NativeProps & { href?: string } = $props();
</script>

<PaginationLink data-slot="pagination-previous" aria-label="Go to previous page" {href} {...rest}>
	<span aria-hidden="true">‹</span>
	<span>
		{#if children}
			{@render children()}
		{:else}
			Previous
		{/if}
	</span>
</PaginationLink>
