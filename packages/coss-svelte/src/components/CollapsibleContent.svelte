<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CollapsiblePrimitive.Content>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
	forceMount?: boolean;
};

let { class: className = "", children, forceMount = true, ...rest }: Props = $props();
</script>

<CollapsiblePrimitive.Content
	data-slot="collapsible-content"
	class={cn("cn-collapsible-content", className)}
	{forceMount}
	{...rest}
>
	<div class="cn-collapsible-content-inner">
		{@render children?.()}
	</div>
</CollapsiblePrimitive.Content>
