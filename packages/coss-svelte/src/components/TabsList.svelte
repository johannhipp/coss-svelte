<script lang="ts">
import { Tabs as TabsPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<TabsPrimitive.List
	data-slot="tabs-list"
	class={cn("cn-tabs-list", className)}
	{...rest}
>
	{@render children?.()}
</TabsPrimitive.List>
