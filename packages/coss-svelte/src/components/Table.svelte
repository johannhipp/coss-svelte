<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<div data-slot="table-wrap" class="cn-table-wrap">
	<table data-slot="table" class={cn("cn-table", className)} {...rest}>
		{@render children?.()}
	</table>
</div>
