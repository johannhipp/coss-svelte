<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof AlertDialogPrimitive.Trigger>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<AlertDialogPrimitive.Trigger
	bind:ref
	data-slot="alert-dialog-trigger"
	class={cn("cn-alert-dialog-trigger", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Trigger>
