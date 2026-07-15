<script lang="ts">
import { Pagination as PaginationPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<PaginationPrimitive.NextButton
	data-slot="pagination-next-button"
	class={cn("cn-pagination-button", className)}
	{...rest}
>
	{@render children?.()}
</PaginationPrimitive.NextButton>
