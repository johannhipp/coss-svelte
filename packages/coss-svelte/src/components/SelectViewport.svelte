<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SelectPrimitive.Viewport>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Viewport
	bind:ref
	data-slot="select-viewport"
	class={cn("cn-select-viewport", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.Viewport>
