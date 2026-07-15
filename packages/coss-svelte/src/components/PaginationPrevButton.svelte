<script lang="ts">
import { Pagination as PaginationPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<PaginationPrimitive.PrevButton
	data-slot="pagination-prev-button"
	class={cn("cn-pagination-button", className)}
	{...rest}
>
	{@render children?.()}
</PaginationPrimitive.PrevButton>
