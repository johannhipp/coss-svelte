<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CommandPrimitive.Item>, "children" | "child"> & {
	class?: string;
	children?: ComponentProps<typeof CommandPrimitive.Item>["children"];
	forceMount?: boolean;
};

let { class: className = "", children, forceMount, ...rest }: Props = $props();
</script>

<CommandPrimitive.Item
	data-slot="command-item"
	class={cn("cn-command-item", className)}
	{forceMount}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Item>
