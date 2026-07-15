<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<div data-slot="alert-action" class={cn("cn-alert-action", className)} {...rest}>
	{@render children?.()}
</div>
