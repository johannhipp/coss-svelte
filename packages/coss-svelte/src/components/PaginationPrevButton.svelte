<script lang="ts">
import { Pagination as PaginationPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof PaginationPrimitive.PrevButton>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<PaginationPrimitive.PrevButton
	bind:ref
	data-slot="pagination-prev-button"
	class={cn("cn-pagination-button", className)}
	{...rest}
>
	{@render children?.()}
</PaginationPrimitive.PrevButton>
