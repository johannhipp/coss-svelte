<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<AlertDialogPrimitive.Portal>
	<AlertDialogPrimitive.Overlay data-slot="alert-dialog-overlay" class="cn-dialog-overlay" />
	<AlertDialogPrimitive.Content
		data-slot="alert-dialog-popup"
		class={cn("cn-dialog cn-alert-dialog", className)}
		{...rest}
	>
		{@render children?.()}
	</AlertDialogPrimitive.Content>
</AlertDialogPrimitive.Portal>
