<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof DialogPrimitive.Description>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Description
	bind:ref
	data-slot="sheet-description"
	class={cn("cn-sheet-description", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Description>
