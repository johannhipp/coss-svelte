<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof DialogPrimitive.Close>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Close
	bind:ref
	data-slot="sheet-close"
	class={cn("cn-sheet-close", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Close>
