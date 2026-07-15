<script lang="ts">
import { Tabs as TabsPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof TabsPrimitive.Trigger>;
let { value, class: className = "", children, ...rest }: Props = $props();
</script>

<TabsPrimitive.Trigger
	data-slot="tabs-trigger"
	class={cn("cn-tabs-trigger", className)}
	{value}
	{...rest}
>
	{@render children?.()}
</TabsPrimitive.Trigger>
