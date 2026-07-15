<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<div data-slot="dialog-panel" class={cn("cn-dialog-panel", className)} {...rest}>
	{@render children?.()}
</div>
