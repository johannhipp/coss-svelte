<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CommandPrimitive.Empty>, "children" | "child"> & {
	class?: string;
	children?: ComponentProps<typeof CommandPrimitive.Empty>["children"];
	forceMount?: boolean;
};

let { class: className = "", children, forceMount, ...rest }: Props = $props();
</script>

<CommandPrimitive.Empty
	data-slot="command-empty"
	class={cn("cn-command-empty", className)}
	{forceMount}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Empty>
