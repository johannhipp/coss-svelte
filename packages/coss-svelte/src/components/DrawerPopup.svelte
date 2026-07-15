<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<DialogPrimitive.Portal>
	<DialogPrimitive.Overlay data-slot="drawer-overlay" class="cn-dialog-overlay" />
	<DialogPrimitive.Content data-slot="drawer-popup" class={cn("cn-drawer", className)} {...rest}>
		{@render children?.()}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
