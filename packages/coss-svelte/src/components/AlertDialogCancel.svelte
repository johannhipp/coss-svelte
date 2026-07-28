<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof AlertDialogPrimitive.Cancel>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<AlertDialogPrimitive.Cancel
	bind:ref
	data-slot="alert-dialog-cancel"
	class={cn("cn-alert-dialog-cancel", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Cancel>
