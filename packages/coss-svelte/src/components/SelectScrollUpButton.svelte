<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof SelectPrimitive.ScrollUpButton>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<SelectPrimitive.ScrollUpButton
	bind:ref
	data-slot="select-scroll-up-button"
	class={cn("cn-select-scroll-button", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.ScrollUpButton>
