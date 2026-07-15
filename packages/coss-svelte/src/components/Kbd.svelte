<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<kbd data-slot="kbd" class={cn("cn-kbd", className)} {...rest}>
	{@render children?.()}
</kbd>
