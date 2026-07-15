<script lang="ts">
import { Tabs as TabsPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof TabsPrimitive.Content>;
let { value, class: className = "", children, ...rest }: Props = $props();
</script>

<TabsPrimitive.Content
	data-slot="tabs-content"
	class={cn("cn-tabs-content", className)}
	{value}
	{...rest}
>
	{@render children?.()}
</TabsPrimitive.Content>
