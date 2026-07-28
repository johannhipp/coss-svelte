<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof DialogPrimitive.Trigger>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Trigger
	bind:ref
	data-slot="drawer-trigger"
	class={cn("cn-drawer-trigger", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Trigger>
