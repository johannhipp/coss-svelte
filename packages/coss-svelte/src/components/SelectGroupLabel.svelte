<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SelectPrimitive.GroupHeading>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<SelectPrimitive.GroupHeading
	bind:ref
	data-slot="select-group-label"
	class={cn("cn-select-group-label", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.GroupHeading>
