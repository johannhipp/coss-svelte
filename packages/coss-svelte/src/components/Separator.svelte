<script lang="ts">
import { Separator as SeparatorPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SeparatorPrimitive.Root>, "child">;
let {
	ref = $bindable(null),
	orientation = "horizontal",
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	data-slot="separator"
	class={cn("cn-separator", `cn-separator-${orientation}`, className)}
	{orientation}
	{...rest}
>
	{@render children?.()}
</SeparatorPrimitive.Root>
