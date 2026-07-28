<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SelectPrimitive.Group>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Group
	bind:ref
	data-slot="select-group"
	class={cn("cn-select-group", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.Group>
