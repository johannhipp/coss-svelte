<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof DialogPrimitive.Title>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Title
	bind:ref
	data-slot="sheet-title"
	class={cn("cn-sheet-title", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Title>
