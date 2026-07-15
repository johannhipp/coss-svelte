<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<span data-slot="meter-track" class={cn("cn-meter-track", className)} {...rest}>
	{@render children?.()}
</span>
