<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof AlertDialogPrimitive.Action>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<AlertDialogPrimitive.Action
	bind:ref
	data-slot="alert-dialog-action"
	class={cn("cn-alert-dialog-action", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Action>
