<script lang="ts">
import { Separator as SeparatorPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof SeparatorPrimitive.Root>;
let { orientation = "horizontal", class: className = "", children, ...rest }: Props = $props();
</script>

<SeparatorPrimitive.Root
	data-slot="separator"
	class={cn("cn-separator", `cn-separator-${orientation}`, className)}
	{orientation}
	{...rest}
>
	{@render children?.()}
</SeparatorPrimitive.Root>
