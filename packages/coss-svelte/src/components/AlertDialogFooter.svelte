<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<div data-slot="alert-dialog-footer" class={cn("cn-alert-dialog-footer", className)} {...rest}>
	{@render children?.()}
</div>
