<script lang="ts">
import { Tabs as TabsPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof TabsPrimitive.Content>, "child">;
let { ref = $bindable(null), value, class: className = "", children, ...rest }: Props = $props();
</script>

<TabsPrimitive.Content
	bind:ref
	data-slot="tabs-content"
	class={cn("cn-tabs-content", className)}
	{value}
	{...rest}
>
	{@render children?.()}
</TabsPrimitive.Content>
