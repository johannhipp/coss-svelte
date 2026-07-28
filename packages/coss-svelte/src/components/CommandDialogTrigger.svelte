<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof DialogPrimitive.Trigger>, "children" | "child"> & {
	class?: string;
	children?: ComponentProps<typeof DialogPrimitive.Trigger>["children"];
};

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Trigger
	bind:ref
	data-slot="command-dialog-trigger"
	class={cn("cn-command-dialog-trigger", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Trigger>
