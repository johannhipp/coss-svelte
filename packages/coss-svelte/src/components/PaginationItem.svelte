<script lang="ts">
import type { NativeProps } from "../internal/props.js";

let { children, ...rest }: NativeProps = $props();
</script>

<li data-slot="pagination-item" {...rest}>
	{@render children?.()}
</li>
