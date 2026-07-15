<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<AlertDialogPrimitive.Action
	data-slot="alert-dialog-action"
	class={cn("cn-alert-dialog-action", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Action>
