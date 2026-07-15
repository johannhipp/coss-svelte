<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<AlertDialogPrimitive.Title
	data-slot="alert-dialog-title"
	class={cn("cn-dialog-title", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Title>
