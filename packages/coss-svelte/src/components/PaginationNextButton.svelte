<script lang="ts">
import { Pagination as PaginationPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof PaginationPrimitive.NextButton>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<PaginationPrimitive.NextButton
	bind:ref
	data-slot="pagination-next-button"
	class={cn("cn-pagination-button", className)}
	{...rest}
>
	{@render children?.()}
</PaginationPrimitive.NextButton>
