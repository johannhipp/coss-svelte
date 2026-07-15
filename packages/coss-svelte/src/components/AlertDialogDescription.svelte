<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<AlertDialogPrimitive.Description
	data-slot="alert-dialog-description"
	class={cn("cn-dialog-description", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Description>
