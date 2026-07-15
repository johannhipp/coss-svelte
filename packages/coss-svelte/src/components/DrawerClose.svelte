<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<DialogPrimitive.Close
	data-slot="drawer-close"
	class={cn("cn-drawer-close", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Close>
